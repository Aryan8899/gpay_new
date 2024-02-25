import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../App.css";

function Balance() {
  const [accountInfo, setAccountInfo] = useState({
    address: "none",
    balance: ethers.utils.formatEther(0),
  });

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const account = accounts[0];

          const provider = new ethers.providers.Web3Provider(ethereum);

          const accountBalance = await provider.getBalance(account);

          setAccountInfo({
            address: account,
            balance: ethers.utils.formatEther(accountBalance),
          });
        } else {
          alert("please install metamask");
        }
      } catch (error) {
        console.log("error loading", error);
      }
    };
    fetchAccount();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <p>Address: {accountInfo.address}</p>
      <p>Balance: {accountInfo.balance}</p>
    </div>
  );
}

export default Balance;
