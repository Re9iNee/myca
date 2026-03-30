import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email/resendEmailService";
import { createOrUpdateActiveOtp } from "@/lib/auth/otp";

type StartForgotPasswordBody = {
  email: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StartForgotPasswordBody;
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "INVALID_INPUT",
          message: "ایمیل نامعتبر است.",
        }),
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "USER_NOT_FOUND",
          message: "کاربری با این ایمیل یافت نشد.",
        }),
        { status: 404 },
      );
    }

    const otpResult = await createOrUpdateActiveOtp(email, "forgot_password");

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

    const idempotencyKey = `otp-forgot_password-${email}-${otpResult.otpId}`;

    const sendResult = await sendOtpEmail({
      to: email,
      code: otpResult.code,
      purpose: "forgot_password",
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
    console.error("Error in /api/auth/forgot-password/start", error);
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

