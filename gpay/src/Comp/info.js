import React, { useEffect, useState } from "react";
import axios from "axios";

function Info() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log("Fetching transactions...");
    const fetchTransactions = async () => {
      try {
        const etherscanApiKey = "1ZRT2KMFW944MUP9HUIQ5WEFHXPZVXGV7A";
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const account = accounts[0];

          const apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${account}&apikey=${etherscanApiKey}`;

          const response = await axios.get(apiUrl);
          console.log("Etherscan API Response:", response.data);
          setTransactions(response.data.result);
          console.log("Transactions:", transactions); // This will log the previous state
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchTransactions();
  }, []); // Removed apiUrl from the dependencies array

  return (
    <>
      <div>
        <h2 className="d-flex justify-content-center">Transaction Details:</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Transaction-hash</th>
              <th scope="col">Time</th>
              <th scope="col">Block </th>
              <th scope="col">gas</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.hash}</td>
                <td>
                  {new Date(transaction.timeStamp * 1000).toLocaleString()}
                </td>
                <td>{transaction.blockNumber}</td>
                <td>{transaction.gasPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Info;
