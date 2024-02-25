import React, { useEffect, useState } from "react";

import logo from "../Screenshot 2024-02-05 193440.png";
import "../App.css";

const Qr = () => {
  const [ethereumAccount, setEthereumAccount] = useState("");

  const fetchEthereumAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = accounts[0];
        setEthereumAccount(account);
      } catch (error) {
        console.error("Error fetching Ethereum accounts:", error);
      }
    } else {
      console.error("Ethereum is not available in this browser.");
    }
  };

  useEffect(() => {
    fetchEthereumAccount(); // Trigger the Ethereum account retrieval when the component mounts
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '80vh', marginBottom: '-20px' }}>
  <div>
    <img src={logo} alt="logo" className="mx-auto" />
  </div>
  <div>
    <h3 className="qrcode mt-3" style={{ marginLeft: '10px', marginBottom: '15px' }}>Your account: {ethereumAccount}</h3>
  </div>
  {/* You can also display the Ethereum account information or QR code here */}
</div>




 


    </>
  );
};

export default Qr;
