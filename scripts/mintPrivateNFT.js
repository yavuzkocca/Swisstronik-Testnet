//const hre = require("hardhat");
const {
    ethers,
    network,
} = require("hardhat");

//const HttpNetworkConfig = require("hardhat/types");

const {
    encryptDataField,
    decryptNodeResponse,
} = require("@swisstronik/utils");


const sendShieldedTransaction = async (signer, destination, data, value) => {

    const rpcLink = network.config.url;

    const [encryptedData] = await encryptDataField(rpcLink, data);

    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {

    const contractAddress = "0x69a507f76dD3546E8b980661143Af133AaEB103A";

    const [signer] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("PrivateNFT");
    const contract = contractFactory.attach(contractAddress);

    const functionName = "mintNFT";
    const recipientAddress = signer.address;
    const mintToken = await sendShieldedTransaction(
        signer,
        contractAddress,
        contract.interface.encodeFunctionData(functionName, [recipientAddress]),
        0
    );

    await mintToken.wait();

    console.log("Mint Transaction Hash: ", mintToken.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});