import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

const ACCESS_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Acts like your "refresh token" lifetime (30 days).
    maxAge: Math.floor(REFRESH_TOKEN_TTL_MS / 1000),
    // Re-issues the session token about every 15 minutes.
    updateAge: Math.floor(ACCESS_TOKEN_TTL_MS / 1000),
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, passwordHash: true, emailVerified: true },
        });

        if (!user) return null;

        const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
        if (!isPasswordValid) return null;

        // Keep your app consistent: only allow signed-in users whose email is verified.
        if (!user.emailVerified) return null;

        return {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  pages: {
    signIn: "/application/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      const now = Date.now();

      // Initial sign-in: attach expiry timestamps to the next-auth JWT.
      if (user) {
        token.userId = (user as any).id;
        token.email = (user as any).email;
        token.emailVerified = (user as any).emailVerified;
        token.accessTokenExpires = now + ACCESS_TOKEN_TTL_MS;
        token.refreshTokenExpires = now + REFRESH_TOKEN_TTL_MS;
        return token;
      }

      // Subsequent calls: if "access token" lifetime expired, "refresh" it
      // by extending the access expiry (while refresh is still valid).
      if (
        typeof token.accessTokenExpires === "number" &&
        typeof token.refreshTokenExpires === "number"
      ) {
        if (now > token.accessTokenExpires && now < token.refreshTokenExpires) {
          token.accessTokenExpires = now + ACCESS_TOKEN_TTL_MS;
        }

        // When refresh lifetime is done, invalidate session by clearing identity fields.
        // (NextAuth v4 callback types don't allow returning `null` here.)
        if (now > token.refreshTokenExpires) {
          delete (token as any).userId;
          delete (token as any).email;
          delete (token as any).emailVerified;
          delete (token as any).accessTokenExpires;
          delete (token as any).refreshTokenExpires;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId as string | undefined;
        (session.user as any).emailVerified = token.emailVerified as boolean | undefined;
      }

      if (!token.userId) {
        // Treat expired sessions as signed-out for consumers of `useSession()`.
        (session as any).user = undefined;
      }

      (session as any).accessTokenExpires = token.accessTokenExpires as number | undefined;
      (session as any).refreshTokenExpires = token.refreshTokenExpires as number | undefined;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

