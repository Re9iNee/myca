import { sendOtpEmail } from "@/lib/email/resendEmailService";
import {
  createOrUpdateActiveOtp,
  type OtpPurpose,
} from "@/lib/auth/otp";

type SendOtpBody = {
  email: string;
  purpose: OtpPurpose;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendOtpBody;
    const email = body.email?.trim().toLowerCase();
    const purpose = body.purpose;

    if (!email || !purpose) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "INVALID_INPUT",
          message: "ایمیل یا نوع درخواست نامعتبر است.",
        }),
        { status: 400 },
      );
    }

    const otpResult = await createOrUpdateActiveOtp(email, purpose);

    if (!otpResult.ok) {
      const status =
        otpResult.errorCode === "TOO_MANY_REQUESTS" ? 429 : 429;

      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: otpResult.errorCode,
          message: otpResult.message,
        }),
        { status },
      );
    }

    const idempotencyKey = `otp-${purpose}-${email}-${otpResult.otpId}`;

    const sendResult = await sendOtpEmail({
      to: email,
      code: otpResult.code,
      purpose,
      idempotencyKey,
    });

    if (sendResult.status === "error") {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: sendResult.errorCode ?? "DELIVERY_FAILED",
          message:
            sendResult.errorMessage ??
            "ارسال ایمیل با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید.",
        }),
        { status: sendResult.retryable ? 503 : 500 },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/auth/otp/send", error);
    return new Response(
      JSON.stringify({
        ok: false,
        errorCode: "INTERNAL_ERROR",
        message: "خطای غیرمنتظره‌ای رخ داد.",
      }),
      { status: 500 },
    );
  }
}

