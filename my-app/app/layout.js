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
  let session = await getServerSession(authOptions);
  const db = (await connectDB).db("signup");
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
