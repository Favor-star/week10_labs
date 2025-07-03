import GitHub from "next-auth/providers/github";
import { type NextAuthConfig, CredentialsSignin } from "next-auth";
import {} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema/zod";
import { prisma } from "./lib/prisma";
import { error } from "console";
import { compareHash } from "./lib";

class InvalidEmailError extends CredentialsSignin {
  code = "Email doesn't exist";
}
class InvalidDataError extends CredentialsSignin {
  code = "Invalid data";
}

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "favor@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credantials) => {
        const loginData = LoginSchema.safeParse(credantials);
        console.log(loginData.error);
        if (!loginData.success) throw new InvalidDataError();
        const {
          data: { email, password },
        } = loginData;
        const user = await prisma.user.findUnique({ where: { email } });
        console.log(user)
        if (!user) throw new InvalidEmailError();
        const isPasswordCorrect = await compareHash(password, user.password);
        if (!isPasswordCorrect) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
