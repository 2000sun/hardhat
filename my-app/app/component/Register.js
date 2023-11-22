"use client";
import { React } from "react";
import LoginButton from "./LoginButton";
import { Button, Input } from "antd";

export default function Register({ result }) {
  return (
    <div className="register-container">
      <div className="register">
        {/* 전송 버튼을 누르면 signup 서버에 유저가 입력한 데이터 전송 */}
        <form className="form" method="POST" action="/api/auth/signup">
          <h2>회원가입</h2>
          <div className="input-box">
            <p>이름</p>
            <Input name="name" type="text" />
            <p>이메일</p>
            <Input name="email" type="text" />
            <p>비밀번호</p>
            <Input name="password" type="password" />
          </div>

          <div className="btn">
            <button
              className="register-btn"
              onClick={() => {
                alert("회원가입 성공! 로그인 해주세요.");
              }}
              type="submit"
            >
              회원가입
            </button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}
