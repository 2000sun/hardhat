"use client";
import { React, useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import abi from "@/app/ABI/user.json";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";
import User from "./component/User";

const MetaMask = ({ session, result }) => {
  console.log("session???", session);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x44C4dF90b42DEfC51b73d8F2104393D0d5B499cC";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

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
      <p> 연결된 계좌 : {account} </p>

      {session ? (
        <span>
          {session.user.name} <LogoutButton />
        </span>
      ) : (
        <LoginButton state={state} result={result}></LoginButton>
      )}

      <User state={state}></User>
    </div>
  );
};

export default MetaMask;
