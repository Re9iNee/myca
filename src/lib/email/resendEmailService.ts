import { Resend } from "resend";

type OtpPurpose = "signup" | "forgot_password";

export type SendResult =
  | {
      status: "success";
      id: string | null;
    }
  | {
      status: "error";
      errorCode?: string | number;
      errorMessage?: string;
      retryable: boolean;
    };

type SendOtpEmailParams = {
  to: string;
  code: string;
  purpose: OtpPurpose;
  idempotencyKey: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  process.env.EMAIL_FROM ??
  process.env.NEXT_PUBLIC_EMAIL_FROM; // fallback but should not expose secrets

if (!RESEND_API_KEY) {
  console.warn(
    "[email] RESEND_API_KEY is not set. OTP emails will fail until it is configured.",
  );
}

if (!FROM_EMAIL) {
  console.warn(
    "[email] No FROM email configured (RESEND_FROM_EMAIL or EMAIL_FROM).",
  );
}

const resend =
  RESEND_API_KEY != null ? new Resend(RESEND_API_KEY) : (null as Resend | null);

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30_000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error: unknown): boolean {
  const anyError = error as { statusCode?: number | string; code?: string };

  const statusCode =
    typeof anyError.statusCode === "string"
      ? Number.parseInt(anyError.statusCode, 10)
      : anyError.statusCode;

  if (!statusCode) {
    // network-ish errors from fetch/undici often only have a code
    if (anyError.code && ["ETIMEDOUT", "ECONNRESET"].includes(anyError.code)) {
      return true;
    }
    return false;
  }

  if (statusCode >= 500) return true;
  if (statusCode === 429) return true;

  return false;
}

async function sendWithRetry(
  emailData: Parameters<Resend["emails"]["send"]>[0],
  idempotencyKey: string,
): Promise<SendResult> {
  if (!resend || !RESEND_API_KEY) {
    return {
      status: "error",
      retryable: false,
      errorCode: "MISSING_CONFIG",
      errorMessage:
        "Email sending is not configured. RESEND_API_KEY is missing.",
    };
  }

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      try {
        const result = await resend.emails.send(emailData, {
          headers: {
            "Idempotency-Key": idempotencyKey,
          },
          signal: controller.signal,
        } as never);

        clearTimeout(timeout);

        if ("error" in result && result.error) {
          const { name, message } = result.error;
          return {
            status: "error",
            retryable: false,
            errorCode: name,
            errorMessage: message,
          };
        }

        return {
          status: "success",
          id: "id" in result ? (result.id as string | null) : null,
        };
      } finally {
        clearTimeout(timeout);
      }
    } catch (error) {
      const retryable = isRetryableError(error);

      if (!retryable || attempt === MAX_RETRIES - 1) {
        const anyError = error as { statusCode?: number; message?: string };
        return {
          status: "error",
          retryable,
          errorCode: anyError.statusCode ?? "UNKNOWN",
          errorMessage: anyError.message ?? "Failed to send email",
        };
      }

      const attemptDelay = Math.min(
        BASE_DELAY_MS * Math.pow(2, attempt),
        MAX_DELAY_MS,
      );
      const jitter = Math.random() * 1000;
      await sleep(attemptDelay + jitter);
    }
  }

  return {
    status: "error",
    retryable: false,
    errorCode: "UNREACHABLE",
    errorMessage: "Unknown email sending error",
  };
}

function buildOtpSubject(purpose: OtpPurpose): string {
  if (purpose === "signup") {
    return "کد تایید ایمیل شما در MYCA";
  }
  if (purpose === "forgot_password") {
    return "کد بازیابی رمز عبور شما در MYCA";
  }
  return "کد تأیید شما";
}

function buildOtpHtml(code: string, purpose: OtpPurpose): string {
  const title =
    purpose === "signup" ? "تایید ایمیل و تکمیل ثبت‌نام" : "بازیابی رمز عبور";

  return `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; direction: rtl; text-align: right; padding: 24px;">
    <h1 style="font-size: 20px; margin-bottom: 16px;">${title}</h1>
    <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
      کد یکبار مصرف شما:
    </p>
    <div style="font-size: 28px; font-weight: 700; letter-spacing: 4px; text-align: center; padding: 12px 16px; border-radius: 12px; background: #f3f4f6; margin-bottom: 16px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">
      ${code}
    </div>
    <p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin-bottom: 8px;">
      این کد تا ۱۵ دقیقه معتبر است و فقط یک‌بار قابل استفاده است.
    </p>
    <p style="font-size: 13px; line-height: 1.6; color: #6b7280;">
      اگر شما این درخواست را ارسال نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید.
    </p>
  </div>
  `;
}

export async function sendOtpEmail({
  to,
  code,
  purpose,
  idempotencyKey,
}: SendOtpEmailParams): Promise<SendResult> {
  if (!FROM_EMAIL) {
    return {
      status: "error",
      retryable: false,
      errorCode: "MISSING_FROM_EMAIL",
      errorMessage:
        "FROM email is not configured. Set RESEND_FROM_EMAIL or EMAIL_FROM.",
    };
  }

  const subject = buildOtpSubject(purpose);
  const html = buildOtpHtml(code, purpose);

  return sendWithRetry(
    {
      from: FROM_EMAIL,
      to,
      subject,
      html,
    },
    idempotencyKey,
  );
}
