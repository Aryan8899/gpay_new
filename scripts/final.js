const hre = require("hardhat");

async function main() {
  const GPAY = await hre.ethers.getContractFactory("gpay");
  const contract = await GPAY.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
