import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

const Edit = async (props) => {
  let db = (await connectDB).db("signup");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(result);

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <input
          name="_id"
          defaultValue={result._id.toString()}
          style={{ display: "none" }}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Edit;
