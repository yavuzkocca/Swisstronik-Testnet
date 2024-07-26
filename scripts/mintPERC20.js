// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
    // Get the RPC link from the network configuration
    const rpcLink = hre.network.config.url;

    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpcLink, data);

    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {
    // Address of the deployed contract
    const contractAddress = "0xAdf767272A7438c03d9999E121BFd8B5dDb24Dda";

    // Get the signer (your account)
    const [signer] = await hre.ethers.getSigners();

    // Create a contract instance
    const contractFactory = await hre.ethers.getContractFactory("PERC20Sample");
    const contract = contractFactory.attach(contractAddress);

    // Send a shielded transaction to mint 100 tokens in the contract
    const functionName = "mint100tokens";
    const mint = await sendShieldedTransaction(
        signer,
        contractAddress,
        contract.interface.encodeFunctionData(functionName),
        0
    );

    await mint.wait();

    // It should return a TransactionReceipt object
    console.log("Transaction Receipt: ", mint);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});