const hre = require("hardhat");

async function main() {
    const Document = await hre.ethers.getContractFactory("DocumentDetails");
    const contract = await Document.deploy();
    
    await contract.deployed();
    console.log("Address of contract: ", contract.address);
}
main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});