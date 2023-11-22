import React from "react";
import { Button, Flex, Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const Write = async () => {
  return (
    <div className="p-20">
      {/* 유저가 글을 작성하고 작성버튼을 누르면 /api/post/new 서버로 이동 */}
      <form action="/api/post/new" method="POST">
        <Input className="write-input" name="title" placeholder="글 제목" />
        <TextArea
          className="write-textarea"
          name="content"
          cols="30"
          rows="10"
          placeholder="글 내용"
        ></TextArea>
        <button className="write-btn" type="submit">
          작성
        </button>
      </form>
    </div>
  );
};

export default Write;
