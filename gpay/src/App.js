import React from 'react';
import Transfer from "./function/transfer";

import { BrowserRouter as Router, Route, NavLink,Routes } from 'react-router-dom';
import abi from './gpay.json';
import { useState, useEffect } from "react";
import Balance from './Comp/check-balance';
import Home from './Comp/Home';
import Info from './Comp/info';
import QrCode from './Comp/qr code';
import { ethers } from "ethers";
import "./App.css";


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x1c9f2A4baE02Ce5De8792e4D223f4AeFFC8abD0A";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
   console.log(state);

// execution of the code


  return (
    

    <Router>
      <div>
        <nav>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" exact to="/">
                Home
              </NavLink>
              
              
             
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/check-balance">
                Check Balance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/account-info">
                Info
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/qr-code">
                QR Code
              </NavLink>
            </li>
          </ul>
        </nav>
        
        

        <Routes>
          <Route path="/" element={<Transfer state={state}  />} />
          
          <Route path="/check-balance" element={<Balance />} />
          <Route path="/account-info" element={<Info />} />
          <Route path="/qr-code" element={<QrCode />} />
        </Routes>
        
        
      </div>
    </Router>
  );
};
export default App;