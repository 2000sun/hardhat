import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    let changeData = { title: req.body.title, content: req.body.content };
    let db = (await connectDB).db("signup");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: changeData });
    console.log(result);
    res.redirect(302, "/list");
  }
}
