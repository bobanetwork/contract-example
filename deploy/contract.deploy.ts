import {Contract, ethers, Wallet} from 'ethers'
import YourContractJson from "../artifacts/contracts/YourContract.sol/YourContract.json";

let YourContract: Contract

const hre = require("hardhat")
const prompt = require("prompt-sync")()

async function main() {

    console.log(`'Deploying contract...`)

    const provider = hre.ethers.provider
    const network = hre.network

    console.log(`Network name=${network?.name}`)

    const deployer = new Wallet(network.config.accounts[0], provider)

    const Factory__YourContract = new ethers.ContractFactory(
        YourContractJson.abi,
        YourContractJson.bytecode,
        deployer
    )

    let gasLimit = prompt("Custom gas limit? [number/N]")
    if (isNaN(gasLimit?.toLowerCase())) {
        gasLimit = null;
    } else {
        gasLimit = parseInt(gasLimit)
    }

    YourContract = await Factory__YourContract.deploy({gasLimit})
    let res = await YourContract.deployTransaction.wait()
    console.log(`Deployed contract: `, res)

    console.log(`Contract deployed to: ${YourContract.address}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

module.exports = main;
