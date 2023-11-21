import { signIn } from "next-auth/react";
import { React } from "react";
import { ethers, providers } from "ethers";

const LoginButton = ({ state }) => {
  const user = async () => {
    const { contract } = state;
    console.log("contract??", contract);
    const name = "김태양";
    const message = "23";
    const amount = { value: ethers.utils.parseEther("0.01") };
    console.log(amount);
    const transaction = await contract.registerUser(name, message, amount);
    await transaction.wait();
    console.log("name : ", name);
    console.log("message : ", message);
    console.log("트랜잭션 성공!!!");
    // alert("트랜잭션 성공임!!!");
    signIn();

    // window.location.reload();
  };
  return (
    <>
      <button
        onClick={() => {
          alert("로그인 시도중!");
          user();
        }}
      >
        로그인
      </button>
    </>
  );
};

export default LoginButton;
