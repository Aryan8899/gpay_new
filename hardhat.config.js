require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const sapola_url = process.env.sapola_url;
const privatekey = process.env.privatekey;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: sapola_url,
      accounts: [privatekey],
    },
  },
};
