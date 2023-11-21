"use client";
import { React, useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import abi from "@/app/ABI/user.json";
import User from "./component/User";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./LogoutButton";

const MetaMask = ({ session }) => {
  console.log("session???", session);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
        <LoginButton state={state}></LoginButton>
      )}
    </div>
  );
};

export default MetaMask;
