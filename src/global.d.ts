import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

// augment NextAuth User type to inlcude the added fields
declare module "next-auth" {
  interface User {
    hasCompletedOnboarding?: boolean;
    jobTitle?: string;
    username?: string;
  }

  interface Token {
    id: string;
  }

  interface Session extends DefaultSession {
    user?: User;
    token: Token;
  }
}
