import { prisma } from "@/lib/prisma";

export type OtpPurpose = "signup" | "forgot_password";

const OTP_LENGTH = 5;
const OTP_EXPIRY_MINUTES = 15;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_SENDS_PER_HOUR = 3;
const MAX_VERIFY_ATTEMPTS = 5;

export type CreateOtpResult =
  | {
      ok: true;
      otpId: string;
      email: string;
      code: string;
      purpose: OtpPurpose;
    }
  | {
      ok: false;
      errorCode: "TOO_SOON" | "TOO_MANY_REQUESTS";
      message: string;
    };

export type VerifyOtpResult =
  | {
      ok: true;
      email: string;
      purpose: OtpPurpose;
    }
  | {
      ok: false;
      reason: "INVALID_CODE" | "EXPIRED" | "TOO_MANY_ATTEMPTS" | "NOT_FOUND";
      message: string;
    };

export function generateOtpCode(length: number = OTP_LENGTH): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

export async function createOrUpdateActiveOtp(
  email: string,
  purpose: OtpPurpose,
): Promise<CreateOtpResult> {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const existing = await prisma.emailOtp.findFirst({
    where: {
      email,
      purpose,
      consumedAt: null,
      expiresAt: { gt: now },
    },
    orderBy: { createdAt: "desc" },
  });

  const sendsLastHour = await prisma.emailOtp.count({
    where: {
      email,
      purpose,
      createdAt: { gte: oneHourAgo },
    },
  });

  if (sendsLastHour >= MAX_SENDS_PER_HOUR) {
    return {
      ok: false,
      errorCode: "TOO_MANY_REQUESTS",
      message:
        "تعداد تلاش‌های ارسال کد در یک ساعت گذشته بیش از حد مجاز است. لطفاً بعداً دوباره تلاش کنید.",
    };
  }

  if (existing) {
    const secondsSinceLastSend =
      (now.getTime() - existing.lastSentAt.getTime()) / 1000;

    if (secondsSinceLastSend < RESEND_COOLDOWN_SECONDS) {
      return {
        ok: false,
        errorCode: "TOO_SOON",
        message: "برای ارسال مجدد کد، چند لحظه صبر کنید.",
      };
    }

    const updated = await prisma.emailOtp.update({
      where: { id: existing.id },
      data: {
        sendCount: existing.sendCount + 1,
        lastSentAt: now,
      },
    });

    return {
      ok: true,
      otpId: updated.id,
      email: updated.email,
      code: updated.code,
      purpose: updated.purpose,
    };
  }

  const code = generateOtpCode();
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const created = await prisma.emailOtp.create({
    data: {
      email,
      purpose,
      code,
      expiresAt,
      lastSentAt: now,
    },
  });

  return {
    ok: true,
    otpId: created.id,
    email: created.email,
    code: created.code,
    purpose: created.purpose,
  };
}

export async function verifyOtpCode(params: {
  email: string;
  purpose: OtpPurpose;
  code: string;
}): Promise<VerifyOtpResult> {
  const { email, purpose, code } = params;
  const now = new Date();

  const otp = await prisma.emailOtp.findFirst({
    where: {
      email,
      purpose,
      consumedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    return {
      ok: false,
      reason: "NOT_FOUND",
      message: "کدی برای این ایمیل یافت نشد. لطفاً دوباره درخواست دهید.",
    };
  }

  if (otp.expiresAt <= now) {
    return {
      ok: false,
      reason: "EXPIRED",
      message: "کد شما منقضی شده است. لطفاً کد جدیدی دریافت کنید.",
    };
  }

  if (otp.attemptCount >= MAX_VERIFY_ATTEMPTS) {
    return {
      ok: false,
      reason: "TOO_MANY_ATTEMPTS",
      message:
        "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفاً بعداً دوباره تلاش کنید.",
    };
  }

  if (otp.code !== code) {
    await prisma.emailOtp.update({
      where: { id: otp.id },
      data: {
        attemptCount: otp.attemptCount + 1,
      },
    });

    const tooMany = otp.attemptCount + 1 >= MAX_VERIFY_ATTEMPTS;

    return {
      ok: false,
      reason: tooMany ? "TOO_MANY_ATTEMPTS" : "INVALID_CODE",
      message: tooMany
        ? "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفاً بعداً دوباره تلاش کنید."
        : "کد وارد شده صحیح نیست. لطفاً دوباره امتحان کنید.",
    };
  }

  await prisma.emailOtp.update({
    where: { id: otp.id },
    data: {
      consumedAt: now,
    },
  });

  return {
    ok: true,
    email,
    purpose,
  };
}
