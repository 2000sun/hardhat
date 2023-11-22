import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  // 깃헙 로그인
  providers: [
    GithubProvider({
      clientId: "18720fddd6085a4f2694",
      clientSecret: "05e08006a879ea4331858c1506cab743a94f8402",
    }),

    // 로그인페이지 자동생성
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 로그인요청시 작동하는 코드
      // DB에서 아이디,비번 비교하고
      // 아이디,비번 맞으면 return을 하고, 틀리면 return null을 함
      async authorize(credentials) {
        let db = (await connectDB).db("signup");
        let user = await db
          .collection("user-info")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일동안 로그인 세션이 유효
  },

  // 로그아웃시 원하는 페이지로 리다이렉트 하기위해 작성한 코드
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    // jwt 만들기 위한 코드
    //DB에 저장된 유저정보를  token.user에 저장해 jwt를 생성
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    // 유저 세션이 조회될때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: "0000",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
