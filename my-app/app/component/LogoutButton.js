"use client";
import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <>
      <button
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        로아웃
      </button>
    </>
  );
};

export default LogoutButton;
