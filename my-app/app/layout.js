import { Inter } from "next/font/google";
import "./globals.css";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MetaMask from "./MetaMask";
import { connectDB } from "@/util/database";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  // 로그인 성공할때 유저의 이름과 이메일이 담기는 변수
  let session = await getServerSession(authOptions);

  // signup 데이터베이스를 가져옴
  const db = (await connectDB).db("signup");

  // user-info 컬렉션을 모두 가져옴
  let result = await db.collection("user-info").find().toArray();

  return (
    <html lang="en">
      <body className={inter.className}>
        <MetaMask session={session} result={result}></MetaMask>
        {children}
      </body>
    </html>
  );
}
