import { prisma } from "@/lib/prisma";
import { verifyOtpCode, type OtpPurpose } from "@/lib/auth/otp";

type VerifyOtpBody = {
  email: string;
  purpose: OtpPurpose;
  code: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyOtpBody;
    const email = body.email?.trim().toLowerCase();
    const purpose = body.purpose;
    const code = body.code?.trim();

    if (!email || !purpose || !code) {
      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: "INVALID_INPUT",
          message: "اطلاعات وارد شده نامعتبر است.",
        }),
        { status: 400 },
      );
    }

    const result = await verifyOtpCode({ email, purpose, code });

    if (!result.ok) {
      const status =
        result.reason === "EXPIRED" || result.reason === "INVALID_CODE"
          ? 422
          : 429;

      return new Response(
        JSON.stringify({
          ok: false,
          errorCode: result.reason,
          message: result.message,
        }),
        { status },
      );
    }

    if (purpose === "signup") {
      await prisma.user.updateMany({
        where: { email },
        data: { emailVerified: true },
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/auth/otp/verify", error);
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

