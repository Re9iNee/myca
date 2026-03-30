import { prisma } from "@/lib/prisma";
import { verifyOtpCode } from "@/lib/auth/otp";
import bcrypt from "bcryptjs";

type CompleteForgotPasswordBody = {
  email: string;
  code: string;
  newPassword: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CompleteForgotPasswordBody;
    const email = body.email?.trim().toLowerCase();
    const code = body.code?.trim();
    const newPassword = body.newPassword;

    if (!email || !code || !newPassword) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "INVALID_INPUT",
          message: "اطلاعات وارد شده نامعتبر است.",
        }),
        { status: 400 },
      );
    }

    const verifyResult = await verifyOtpCode({
      email,
      purpose: "forgot_password",
      code,
    });

    if (!verifyResult.ok) {
      const status =
        verifyResult.reason === "EXPIRED" ||
        verifyResult.reason === "INVALID_CODE"
          ? 422
          : 429;

      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: verifyResult.reason,
          message: verifyResult.message,
        }),
        { status },
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const updated = await prisma.user.updateMany({
      where: { email },
      data: { passwordHash },
    });

    if (updated.count === 0) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "USER_NOT_FOUND",
          message: "کاربری با این ایمیل یافت نشد.",
        }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/auth/forgot-password/complete", error);
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
