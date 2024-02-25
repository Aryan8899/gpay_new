import { ethers } from "ethers";
import React, { useState } from "react";
import "../App.css";
import Spinner from "../Spinner.gif";

const App = ({ state }) => {
  const [loading, setLoading] = useState(false);

  const transfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { contract } = state;

    // Get the value from the recipient input field
    const recipient = document.querySelector("#recipient").value.trim();

    console.log("the recipient is", recipient);

    const amount = ethers.utils.parseEther("0.01");
    console.log("the amount is", amount);

    try {
      // Metamask will automatically sign the transaction
      const gpay = await contract.transfer(recipient, { value: amount });

      await gpay.wait();
      console.log("Transaction is done");
      window.location.reload();
    } catch (error) {
      console.error("Error during transaction:", error.message);
      // Handle the error, provide user feedback, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100">
      
      
      {loading && <img src={Spinner} alt="Spinner" className="centered-image" />
      }
       
      {!loading && (
      <form className="row g-3" onSubmit={transfer}>
        <div className="transfer">
          <label htmlFor="recipient" className="visually-hidden">
            Recipient
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="recipient"
              placeholder="Recipient"
            />
            <div className="input-group-append">
              <span className="input-group-text">$</span>
              <span className="input-group-text">1400</span>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            PAY
          </button>
        </div>
      </form>
      )}
    </div>
      
  );
};
export default App;
