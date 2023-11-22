import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  //  유저 요청이 DELETE 일때만 실행
  if (req.method == "DELETE") {
    // 로그인한 유저만 삭제가 가능하게 하기위해 세션을 생성
    let session = await getServerSession(req, res, authOptions);

    // signup 데이터베이스 가져오기
    let db = (await connectDB).db("signup");

    // 어떤 글을 삭제할건지 알기위해 고유한 id로 findOne을 통해 post 컬렉션에서 조회
    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.body) });

    // 글을 찾았다면 그 글의 author가 처음에 로그인한 유저 이메일과 똑같은지 비교
    if (result.author == session.user.email) {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.body) });
      return res.status(200).json("삭제완료");
    } else {
      res.status(500).json("다른사람글은 삭제 불가능합니다!");
    }

    console.log(result);
  }
}
