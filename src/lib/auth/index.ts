import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthProvider } from "./provider";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma?.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        const { id, email, name } = user;

        return {
          id,
          email,
          name,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const user = await prisma?.user.findUnique({
        where: {
          id: token.id as string,
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          hasCompletedOnboarding: user?.hasCompletedOnboarding,
          name: user?.name,
          username: user?.username,
          jobTitle: user?.jobTitle,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};

export { NextAuthProvider };
