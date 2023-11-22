"use client";
import { signIn } from "next-auth/react";
import { React, useState } from "react";
import { ethers } from "ethers";

const LoginButton = ({ state, result }) => {
  const user = async () => {
    const { contract } = state;

    // result는 회원가입된 유저 전체가 들어있음
    const name = result[result.length - 1].name;
    const email = result[result.length - 1].email;
    const amount = { value: ethers.utils.parseEther("0.001") };
    console.log("트잭전 이름", result[result.length - 1].name);
    console.log("트잭전 이메일", result[result.length - 1].email);

    // 컨트랙트의 registerUser 함수를 사용
    const transaction = await contract.registerUser(name, email, amount);
    await transaction.wait();
    console.log("트잭후 이름", name);
    console.log("트잭후 이메일", email);

    // 트랜잭션 후 로그인 페이지로 이동함
    signIn({ callbackUrl: "/" });

    alert("송금완료! 이제 로그인이 가능합니다.");
  };
  return (
    <>
      <div className="login-btn-container">
        <button
          className="login-btn"
          onClick={() => {
            alert("로그인 시도중 잠시만 기다려주세요");
            user();
          }}
        >
          로그인
        </button>
      </div>
    </>
  );
};

export default LoginButton;
