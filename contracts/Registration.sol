// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Registration {
    struct User {
        string username;
        string email;
        string password;
        string role;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddress, string username, string email, string role);

    function registerUser(string memory _username, string memory _email, string memory _password, string memory _role) public {
        users[msg.sender] = User(_username, _email, _password, _role);
        emit UserRegistered(msg.sender, _username, _email, _role);
    }

    function getUserData(address _userAddress) public view returns (string memory, string memory, string memory, string memory) {
        User memory user = users[_userAddress];
        return (user.username, user.email, user.password, user.role);
    }
}