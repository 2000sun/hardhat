import React from "react";
import { ethers } from "ethers";

const User = ({ state }) => {
  //   console.log("state뭔데??", state);
  //   const { contract } = state;
  //   console.log("contract는??", contract);
  const user = async (e) => {
    e.preventDefault();
    const { contract } = state;
    console.log("contract??", contract);
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.01") };
    console.log(amount);
    const transaction = await contract.registerUser(name, message, amount);
    await transaction.wait();
    console.log("name : ", name);
    console.log("message : ", message);
    console.log("트랜잭션 성공!!!");
    alert("트랜잭션 성공임!!!");
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={user}>
        <input id="name" placeholder="이름"></input>
        <input id="message" placeholder="메세지"></input>
        <button>보내기</button>
      </form>
    </div>
  );
};

export default User;
