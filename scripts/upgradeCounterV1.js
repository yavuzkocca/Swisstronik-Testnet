const hre = require("hardhat");
require('@openzeppelin/hardhat-upgrades');

const UPGRADEABLE_PROXY = "0xe3655E47F708200280358F05f712Cd7683426f57";

async function main() {
    const gas = (await hre.ethers.provider.getFeeData()).gasPrice;
    const V2Contract = await hre.ethers.getContractFactory("Counter2");
    let upgrade = await hre.upgrades.upgradeProxy(UPGRADEABLE_PROXY, V2Contract, {
        gasPrice: gas
    });
    console.log("V1 Upgraded to V2");
    console.log("V2 Contract Deployed To:", upgrade.target)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});