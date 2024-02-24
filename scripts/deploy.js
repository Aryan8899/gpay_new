// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("ethers");
const { utils } = require("ethers");

function weiToEther(weiAmount) {
  const weiPerEther = BigInt("1000000000000000000"); // 1 Ether = 10^18 Wei
  const etherAmount = BigInt(weiAmount) / weiPerEther;
  return etherAmount.toString();
}

//function to get balance

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return weiToEther(balanceBigInt);
}

// to get balances of all account
async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function qrcode_gen(owner) {
  console.log("the address of the owner is", owner.address);
}

async function onlyowner(owner) {
  if (owner) {
    console.log("its the owner:");
  } else {
    console.log("please switch to the owner:");
  }
  async function qrcode_gen(owner) {
    console.log("owner address is: ", owner);
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const gpay = await hre.ethers.getContractFactory("gpay");
  const contract = await gpay.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  console.log("Before deployment");
  await consoleBalances(addresses);

  const amount = ethers.parseEther("1");
  //console.log(amount);
  await contract.connect(owner).transfer(from1, { value: amount });
  //await contract
  //  .connect()
  //  .transfer("from1", "Very nice chai", { value: amount });
  //await contract
  //  .connect(from2)
  //  .transfer("from2", "Very nice course", { value: amount });
  //await contract
  //  .connect(from3)
  //  .transfer("from3", "Very nice information", { value: amount });
  console.log("After devlopment");
  await consoleBalances(addresses);

  const own = await contract.qrcode();
  qrcode_gen(owner);
  onlyowner(owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
