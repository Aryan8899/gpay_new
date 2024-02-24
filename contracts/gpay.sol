// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

//Code to just transfer money!

contract gpay {
    
   
    address owner;
event TransferCompleted(address indexed from, address indexed to, uint256 amount);


    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    function onlyowner() public view {
        require(msg.sender == owner, "you are not owner please switch to user");
    }

    function transfer(address payable recipient) external payable onlyOwner{
        require(recipient != address(0) && msg.value > 0, "invalid recipicent ");


        recipient.transfer(msg.value);
        
        emit TransferCompleted(msg.sender, recipient, msg.value);
    }

    function qrcode() public view returns (address) {
        return owner;
    }

    function getbalance() public view returns (uint256) {
        return msg.sender.balance;
    }

    
    

}
