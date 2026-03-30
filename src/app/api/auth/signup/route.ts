import { createOrUpdateActiveOtp } from "@/lib/auth/otp";
import { sendOtpEmail } from "@/lib/email/resendEmailService";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type SignupBody = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "INVALID_INPUT",
          message: "ایمیل یا رمز عبور نامعتبر است.",
        }),
        { status: 400 },
      );
    }

    const existing = await prisma.user.findFirst({
      where: { email },
    });

    if (existing) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "EMAIL_TAKEN",
          message: "برای این ایمیل قبلاً حسابی ساخته شده است.",
        }),
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        passwordHash,
        emailVerified: false,
      },
    });

    const otpResult = await createOrUpdateActiveOtp(email, "signup");

    if (!otpResult.ok) {
      const status = otpResult.errorCode === "TOO_MANY_REQUESTS" ? 429 : 429;

      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: otpResult.errorCode,
          message: otpResult.message,
        }),
        { status },
      );
    }

    const idempotencyKey = `otp-signup-${email}-${otpResult.otpId}`;

    const sendResult = await sendOtpEmail({
      to: email,
      code: otpResult.code,
      purpose: "signup",
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
    console.error("Error in /api/auth/signup", error);
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
