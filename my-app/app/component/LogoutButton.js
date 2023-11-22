"use client";
import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <>
      <img className="user-img-1" src="/logout.png" width={20} height={20} />

      <button
        className="logout-btn"
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        로그아웃
      </button>
    </>
  );
};

export default LogoutButton;
