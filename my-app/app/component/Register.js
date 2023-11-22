"use client";
import { React } from "react";
import User from "./User";
import LoginButton from "./LoginButton";

export default function Register({ result }) {
  const user = () => {};
  return (
    <div className="register-container">
      <div className="register">
        <form className="form" method="POST" action="/api/auth/signup">
          <h2>회원가입</h2>
          <div className="input-box">
            <p>이름</p>
            <input name="name" type="text" />
            <p>이메일</p>
            <input name="email" type="text" />
            <p>비밀번호</p>
            <input name="password" type="password" />
          </div>

          <div className="btn">
            <button
              onClick={() => {
                alert("회원가입 성공! 로그인 해주세요.");
              }}
              type="submit"
            >
              회원가입
            </button>
          </div>
          <div></div>
          {/* <div className="line">
            <div className="left"></div>
            <div>or</div>
            <div className="right"></div>
          </div> */}
        </form>
        <User></User>
      </div>
    </div>
  );
}
