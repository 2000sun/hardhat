import React from "react";
import ListItem from "./ListItem";
import { connectDB } from "@/util/database";
import Link from "next/link";

// 배포시 동적으로 페이지를 렌더링 해줘야하기때문에 이 코드를 작성
export const dynamic = "force-dynamic";

const page = async () => {
  // signup 데이터베이스를 가져옴
  const db = (await connectDB).db("signup");

  // post에 저장된 글을 전부 가져옴
  let result = await db.collection("post").find().toArray();
  console.log(result);

  return (
    <div className="list-info">
      <div className="list-bg-1">
        {/* 이 페이지는 서버측에서 렌더링 되기때문에 따로 클라이언트 컴포넌트에 데이터를 넘겨주어 렌더링 */}
        <ListItem result={result} />
      </div>
    </div>
  );
};

export default page;
