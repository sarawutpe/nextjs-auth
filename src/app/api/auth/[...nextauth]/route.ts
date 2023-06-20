import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import AppleProvider from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials, req) {
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "1234"
        ) {
          return {
            id: "1",
            email: "admin@example.com",
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      name: "Google",
      clientId: `${process.env.NEXT_PUBLIC_GOOGLE_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_GOOGLE_SECRET}`,
    }),
    MicrosoftProvider({
      name: "Microsoft",
      clientId: "",
      clientSecret: "",
    }),
    AppleProvider({
      name: "Microsoft",
      clientId: "",
      clientSecret: "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token }) {
      token.id = 1;
      token.userRole = "user";
      return token;
    },
  },

  session: {},
});

export { handler as GET, handler as POST };
