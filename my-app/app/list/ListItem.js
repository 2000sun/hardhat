"use client";

import Link from "next/link";
import React from "react";
import { Button } from "antd";

const ListItem = ({ result }) => {
  return (
    <div>
      {/* 모든 글을 맵핑 */}
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          {result[i].title}

          {/* 글 수정 페이지로 이동 */}
          {/* 어떤 글이 수정되었는지 알기위해 글의 고유한 id와 함께 보내기 */}
          <Link href={"/edit/" + result[i]._id} className="list-btn">
            <Button className="edit-btn">수정</Button>
          </Link>

          {/* 글 삭제 페이지로 이동 */}
          {/* 어떤 글이 수정되었는지 알기위해 글의 고유한 id와 함께 보내기 */}
          <span
            className="delete-btn"
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[i]._id,
              })
                .then((r) => {
                  return r;
                })
                .then(() => {
                  alert("글삭제가 완료 됐습니다.");
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 100);
                });
            }}
          >
            삭제
          </span>
          <p>{result[i].content}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
