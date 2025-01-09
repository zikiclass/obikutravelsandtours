import NextAuth from "next-auth";
import prisma from "../../../../../prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        let user;

        // Check if the login is for an admin or a regular user
        if (credentials?.isAdmin === "true") {
          user = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });

          // If no user is found, return null
          if (!user) {
            throw new Error("Admin not found");
          }

          // Check if the password matches
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            throw new Error("Incorrect password");
          }

          // Return the user object if the password matches, otherwise null
          if (passwordsMatch) {
            return {
              id: user.id,
              fullname: user.name,
              email: user.email,
              isAdmin: true,
            };
          } else {
            return null;
          }
        } else {
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // If no user is found, return null
          if (!user) {
            throw new Error("User not found");
          }

          // Check if the password matches
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            throw new Error("Incorrect password");
          }

          if (user.verifyCode !== "verified") {
            const error = new Error(
              "Account not verified. Please verify your email."
            );
            error.verifyCode = user.verifyCode;
            throw error;
          }

          // Return the user object if the password matches, otherwise null
          if (passwordsMatch) {
            return {
              id: user.id,
              fullname: user.name,
              email: user.email,
              phone: user.phone,
              isAdmin: false,
            };
          } else {
            return null;
          }
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.phone = token.phone;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },

  pages: {
    signIn: "/auth",
    error: "/auth",
  },

  database: process.env.DATABASE_URL,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
