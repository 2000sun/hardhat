"use client";
import React from "react";

export default function Register({ result }) {
  const user = () => {};
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="이름" />
        <input name="email" type="text" placeholder="이메일" />
        <input name="password" type="password" placeholder="비번" />
        <button
          onClick={() => {
            alert("회원가입 성공! 로그인 해주세요.");
          }}
          type="submit"
        >
          회원가입
        </button>
      </form>

      {/* <div>
        {result.map((a, i) => {
          return (
            <div key={i}>
              <h3>{result[i].name}</h3>
              <h4>{result[i].email}</h4>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}