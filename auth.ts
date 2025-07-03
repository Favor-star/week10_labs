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
  },
});
