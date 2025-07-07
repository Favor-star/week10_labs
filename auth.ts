import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/generated/prisma";
import authConfig from "@/auth.config";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log(user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ token, session }) => {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = String(token.email ?? "");
        session.user.id = String(token.id ?? "");
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      // If the URL is a relative path, return it as is
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If the URL is already a full URL and belongs to the same domain, return it
      if (new URL(url).origin === baseUrl) return url;
      // Otherwise, redirect to the vault page after successful login
      return `${baseUrl}/vault`;
    },
  },
});
