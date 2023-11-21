"use client";
import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <>
      <button
        onClick={() => {
          alert("로그인 시도중!");
          signIn();
        }}
      >
        로그인
      </button>
    </>
  );
};

export default LoginButton;
