"use client";

import Link from "next/link";
import React from "react";


const ListItem = ({ result }) => {
  return (
    <div>
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={"/detail/" + result[i]._id}>{result[i].title}</Link>
          <Link href={"/edit/" + result[i]._id} className="list-btn">
            ✏️
          </Link>
          <span
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
            🗑️
          </span>
          <p>{result[i].content}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
