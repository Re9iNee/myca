import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessTokenExpires?: number;
    refreshTokenExpires?: number;
    user: {
      id?: string;
      emailVerified?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    emailVerified?: boolean;
    accessTokenExpires?: number;
    refreshTokenExpires?: number;
  }
}

export {};
