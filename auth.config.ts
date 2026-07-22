import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const protectedRoutes = [
        "/account",
        "/flashcards",
        "/create",
        "/decks",
      ];

      const isProtected = protectedRoutes.some(route =>
        nextUrl.pathname.startsWith(route)
      );

      if (isProtected && !isLoggedIn) {
        return false;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },

  providers: [],
} satisfies NextAuthConfig;