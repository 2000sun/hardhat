
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract user {

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


    function registerUser(string calldata name, string calldata email) payable external {
        require(msg.value > 0 , "Please pay more than 0 ether");
        owner.transfer(msg.value);
        users.push(User(name,email,block.timestamp,msg.sender));
    }

    function getUser() public view returns(User[] memory) {
        return users;
    }
}