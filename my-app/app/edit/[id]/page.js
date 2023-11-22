import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { Button, Flex, Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const Edit = async (props) => {
  // signup 데이터베이스 가져오기
  let db = (await connectDB).db("signup");

  // 어떤 글이 선택되었는지 알기위해 유저가 선택한 글의 고유한 Id를 가져와 db에서 찾기
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  console.log(result);

  return (
    <div className="p-20">
      {/* 유저가 글을 전부 수정하고 나면 /api/post/edit 서버에 수정 요청을 보냄 */}
      <form action="/api/post/edit" method="POST">
        <Input
          className="write-input"
          name="title"
          defaultValue={result.title}
        />

        <TextArea
          className="write-textarea"
          name="content"
          defaultValue={result.content}
          cols="30"
          rows="10"
        ></TextArea>

        <input
          name="_id"
          defaultValue={result._id.toString()}
          style={{ display: "none" }}
        />
        <button className="write-btn" type="submit">
          수정하기
        </button>
      </form>
    </div>
  );
};

export default Edit;
