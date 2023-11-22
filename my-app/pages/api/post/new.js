import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // 로그인을 한 사람만 글을 작성해야하기위해 session을 받아옴
  let session = await getServerSession(req, res, authOptions);

  // 만약 세션이 있다면 author로 유저 이메일을 저장함
  if (session) {
    req.body.author = session.user.email;
  }

  // 메서드 방식이 포스트이면 글을 발행할 수 있게함
  if (req.method == "POST") {
    let db = (await connectDB).db("signup");
    let result = db.collection("post").insertOne(req.body);
    res.redirect(302, "/list");
  }
}
