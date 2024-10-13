import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { ofetch } from "ofetch";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || "my-auth-secret",
  session: {
    maxAge: 1 * 30 * 60, // 30 minutes
    updateAge: 1 * 30 * 60, // 30 minutes
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      secret: process.env.AUTH_SECRET,
      async authorize(credentials: any) {
        const user = {
          username: credentials.username || "fi000001",
          password: credentials.password || "admin1234!",
        };
        let res = null;
        try {
          res = await ofetch(`http://localhost:5173/serverApi/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          //console.log(res);
          if (res?.success) {
            const ress = {
              name: user.username,
              email: "",
              image: "",
              role: "ROLE", //나중에 역할에 따라 분기처리
              accessToken: res.data.accessToken, // accessToken
            };
            return ress;
          }
        } catch (error) {
          console.error("Error:", error);
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      try {
        session.accessToken = token?.accessToken; // accessToken 할당
        session.role = token?.role; // role 할당
      } catch (error) {
        console.error("Error:", error);
      }
      return { ...session };
    },
    jwt(params: any) {
      if (params.token && params.user) {
        params.token = Object.assign({}, params.token, {
          accessToken: params.user.accessToken,
          role: params.user.role,
        });
      }
      return params.token; // accessToken
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // 기본적으로 홈으로 리다이렉트
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/404",
  },
});
