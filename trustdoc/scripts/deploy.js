// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const [owner, from1, from2, from3, from4] = await hre.ethers.getSigners();
  const contract_code = await hre.ethers.getContractFactory('ProductDetails');
  const contract = await contract_code.deploy();
  await contract.deployed();
  console.log("Address of contract: ", contract.address);
  // const addresses = [owner.address, from1.address, from2.address, from3.address, from4.address];
  console.log("Manufacturer trying to add product ---> ");
  const ma1 = await contract.addProduct("Ramesh", "2233", "6767", "Achadoc", "content");
  console.log("Product Added ^^^ ");
  const ma2 = await contract.addProduct("Suresh", "3322", "111", "Gandadoc", "dcont");
  console.log("Product Added ^^^ ");
  console.log("Checking Genuinty ---> ");
  const prodhas = await contract.callStatic.checkgenuine("111");
  console.log(ma2, prodhas, "Genuity checked ^^^ ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
