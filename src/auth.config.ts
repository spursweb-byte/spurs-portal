import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith("/admin");

            if (isAdminPage) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL("/login", nextUrl));
            }
            return true;
        },
    },
    providers: [], // Providers with dependencies (Prisma, etc.) will be added in auth.ts
} satisfies NextAuthConfig;
