import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    let session = await getServerSession(req, res, authOptions);
    let db = (await connectDB).db("signup");

    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.body) });

    if (result.author == session.user.email) {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.body) });
      return res.status(200).json("삭제완료");
    } else {
      res.status(500).json("다른사람글은 삭제 불가능합니다.");
    }

    console.log(result);
  }
}
