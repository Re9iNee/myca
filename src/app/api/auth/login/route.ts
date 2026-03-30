import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type LoginParams = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  const params = (await request.json()) as LoginParams;

  if (!params.email || !params.password) {
    return NextResponse.json(
      {
        status: "error",
        reason: "email and password should be provided",
        email: params.email,
      },
      { status: 400, statusText: "Email/Password required" },
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { email: params.email, status: "error", reason: "User not found" },
      { status: 404, statusText: "User not found" },
    );
  }

  const isPasswordValid = bcrypt.compareSync(
    params.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { email: params.email, status: "error", reason: "Invalid password" },
      { status: 400, statusText: "Invalid Password" },
    );
  }

  const { passwordHash, ...restOfUser } = user;

  return NextResponse.json(
    {
      user: restOfUser,
      status: "ok",
    },
    { status: 200 },
  );
}
