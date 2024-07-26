const hre = require("hardhat");
require('@openzeppelin/hardhat-upgrades');

async function main() {
    const gas = (await hre.ethers.provider.getFeeData()).gasPrice;
    const V1contract = await hre.ethers.getContractFactory("Counter");

    const v1contract = await hre.upgrades.deployProxy(V1contract);

    await v1contract.waitForDeployment();

    console.log("CounterV1  deployed to:", v1contract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});