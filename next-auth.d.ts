import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["User"];
    expires: string;
    accessToken: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    refreshTokenExpires?: number;
    role?: string;
    error?: "RefreshAccessTokenError";
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires?: number;
    exp: number;
    role?: string;
    error?: "RefreshAccessTokenError";
  }
}
