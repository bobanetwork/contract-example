import {Contract} from 'ethers'
import YourContractJson from "../artifacts/contracts/YourContract.sol/YourContract.json";

let YourContract: Contract

const hre = require("hardhat")
const prompt = require("prompt-sync")()

async function main() {

    console.log(`'Deploying contract...`)

    const provider = hre.ethers.provider
    const network = hre.network

    console.log(`Network name=${network?.name}`)

    const deployer = new hre.ethers.Wallet(network.config.accounts[0], provider)

    const Factory__YourContract = new hre.ethers.ContractFactory(
        YourContractJson.abi,
        YourContractJson.bytecode,
        deployer
    )

    console.log("Deploying contract...")
    
    try {
        YourContract = await Factory__YourContract.deploy()
        
        console.log(`Waiting for transaction to be mined...`)
        const deploymentReceipt = await YourContract.deployTransaction.wait()
        
        console.log(`✅ Deployment successful!`)
        console.log(`Transaction hash: ${deploymentReceipt.transactionHash}`)
        console.log(`Contract deployed to: ${YourContract.address}`)
        console.log(`Gas used: ${deploymentReceipt.gasUsed.toString()}`)
        
        return {
            contract: YourContract,
            address: YourContract.address,
            transactionHash: deploymentReceipt.transactionHash
        }
    } catch (error: any) {
        // Handle "already known" errors as warnings since deployment might still succeed
        if (error.message && error.message.includes('already known')) {
            console.log(`⚠️  Transaction already in mempool, checking for deployment...`)
            
            // Wait a bit for the transaction to be mined
            await new Promise(resolve => setTimeout(resolve, 5000))
            
            try {
                const deploymentReceipt = await YourContract.deployTransaction.wait()
                console.log(`✅ Deployment completed despite mempool warning!`)
                console.log(`Transaction hash: ${deploymentReceipt.transactionHash}`)
                console.log(`Contract deployed to: ${YourContract.address}`)
                console.log(`Gas used: ${deploymentReceipt.gasUsed.toString()}`)
                
                return {
                    contract: YourContract,
                    address: YourContract.address,
                    transactionHash: deploymentReceipt.transactionHash
                }
            } catch (waitError) {
                console.error(`❌ Failed to wait for transaction confirmation:`, waitError.message)
                throw waitError
            }
        } else {
            console.error(`❌ Deployment failed:`, error.message)
            throw error
        }
    }
}

main()
    .then((result) => {
        console.log(`\n🎉 Deployment completed successfully!`)
        if (result) {
            console.log(`📋 Summary:`)
            console.log(`   Contract Address: ${result.address}`)
            console.log(`   Transaction Hash: ${result.transactionHash}`)
        }
        process.exitCode = 0;
    })
    .catch((error) => {
        console.error(`\n❌ Deployment failed:`, error.message || error);
        process.exitCode = 1;
    });

module.exports = main;
