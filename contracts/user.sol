
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract user {
    
// 로그인 한 유저를 담기위한 구조체
    struct User {
        string name;
        string email;
        uint256 timestamp;
        address from;
    }

    address payable owner;
    User[] users;

    constructor() {
        owner = payable(msg.sender);

    }


// 로그인 할 때 이더를 보내야 로그인 성공하는 함수
    function registerUser(string calldata name, string calldata email) payable external {
        require(msg.value > 0 , "Please pay more than 0 ether");
        owner.transfer(msg.value);
        users.push(User(name,email,block.timestamp,msg.sender));
    }

// 현재 로그인한 유저들을 보여주는 함수
    function getUser() public view returns(User[] memory) {
        return users;
    }
}