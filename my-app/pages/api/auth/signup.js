import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  // 유저가 요청한게 POST 형식이라면
  if (req.method == "POST") {
    // 유저의 비밀번호를 해시화 시킴
    let hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    // signup 데이터베이스에 접근
    let db = (await connectDB).db("signup");

    // user-info 컬렉션에 유저 정보 등록
    await db.collection("user-info").insertOne(req.body);
    res.redirect(302, "/");
  }
}
