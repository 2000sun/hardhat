"use client";
import { React, useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import abi from "@/app/ABI/user.json";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";
import Link from "next/link";

const MetaMask = ({ session, result }) => {
  console.log("session???", session);

  // 로그인 버튼 누를 때 컨트랙트의 함수를 이용해야해서 state로 로그인 컴포넌트에 넘겨줌
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // 지갑 연결
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xCB42A2911EE81e14502b21a2ee796bFeE3C5AAb1";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        // 계정이 바뀌면 자동으로 새로고침
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);

  return (
    <div>
      <p className="connect-account"> 연결된 계좌 : {account} </p>

      {/* 로그인 된 정보가 있다면 로그아웃을 보여주고 로그인 안됐으면 로그인 버튼을 보여줌 */}
      {session ? (
        <div className="login-info">
          {/* 유저 이름을 누르면 메인홈으로 이동 */}
          <img className="user-img-1" src="/user.png" width={20} height={20} />
          <Link href="/">
            <div className="user-name">{session.user.name}</div>
          </Link>
          <div className="space"></div>

          {/* 글 작성으로 이동 */}
          <img className="user-img" src="/write.png" width={20} height={20} />
          <Link href="/write">
            <div className="write">글 작성</div>
          </Link>
          <div className="space"></div>

          {/* 글의 목록을 전부 보여줌 */}
          <img className="user-img" src="/list.png" width={20} height={20} />
          <Link href="/list">
            <div className="write">글 목록</div>
          </Link>
          <div className="space"></div>

          {/* 블록체인을 통해 회원가입이 된 모든 유저의 정보를 보여줌 */}
          <img
            className="user-img"
            src="/userList.png"
            width={20}
            height={20}
          />
          <Link href="/userList">
            <div className="write" style={{ marginRight: "40px" }}>
              회원 정보
            </div>
          </Link>

          <LogoutButton />
        </div>
      ) : (
        <LoginButton state={state} result={result}></LoginButton>
      )}
    </div>
  );
};

export default MetaMask;
