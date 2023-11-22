import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // 만약 요청이 POST 라면
  if (req.method == "POST") {
    // 유저가 입력한 제목과 내용을 changeData 에 담기
    let changeData = { title: req.body.title, content: req.body.content };

    // signup 데이터베이스 가져오기
    let db = (await connectDB).db("signup");

    // post 컬렉션에서 updateOne을 통해 고유한 id를 조회해서 찾았으면  set을 통해 데이터를 바꿔준다
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: changeData });

    console.log(result);
    res.redirect(302, "/list");
  }
}
