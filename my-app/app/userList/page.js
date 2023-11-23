"use client";
import { useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import abi from "@/app/ABI/user.json";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // 컨트랙트의 함수를 사용해야하기때문에 초기 셋팅
  const contractAddress = "0x2b88afcd2350C9BD1580942407ABf6eb8fA04a2C";
  const contractABI = abi.abi;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log("contract는??", contract);

  useEffect(() => {
    const userInfo = async () => {
      // contract의 getUser를 통해 처음에 회원가입한 사람들의 목록을 전부 저장
      const users = await contract.getUser();
      setUsers(users);
      console.log(users[0].email);
    };
    contract && userInfo();
  }, [contract]);
  return (
    <div className="user-info">
      {users.map((user, i) => (
        <div className="list-bg">
          <div className="list-item" key={i}>
            <p>{i}번째 회원</p>
            <h3 style={{ color: "green" }}>
              Name: <span style={{ color: "black" }}>{user.name}</span>
            </h3>
            <h3 style={{ color: "green" }}>
              Email: <span style={{ color: "black" }}>{user.email}</span>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
