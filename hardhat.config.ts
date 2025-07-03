import {HardhatUserConfig} from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan";

require('hardhat-deploy');
require('dotenv').config()

const config: HardhatUserConfig & { etherscan: { apiKey: any, customChains: any } } = {
    mocha: {
        timeout: 200000,
    },
    networks: {
        boba_eth_mainnet: {
            url: process.env.LIGHTBRIDGE_RPC_BOBAETHMAINNET ?? 'https://mainnet.boba.network',
            accounts: [process.env.DEPLOYER_PK],
        },
        boba_bnb_mainnet: {
            url: 'https://gateway.tenderly.co/public/boba-bnb',
            accounts: [process.env.DEPLOYER_PK],
        },
        boba_sepolia: {
            url: 'https://sepolia.boba.network',
            accounts: [process.env.DEPLOYER_PK],
        },
        boba_bnb_testnet: {
            url: 'https://boba-bnb-testnet.gateway.tenderly.co',
            accounts: [process.env.DEPLOYER_PK],
        },
    },
    solidity: {
        version: '0.8.9',
        settings: {
            optimizer: {enabled: true, runs: 200},
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    etherscan: {
        apiKey: {
            boba_eth_mainnet: "boba", // not required, set placeholder
            boba_bnb_mainnet: "boba", // not required, set placeholder
            boba_goerli: "boba", // not required, set placeholder
            boba_bnb_testnet: "boba", // not required, set placeholder
            boba_sepolia: "boba", // not required, set placeholder
        },
        customChains: [
            {
                network: "op_sepolia",
                chainId: 11155420,
                urls: {
                    apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
                    browserURL: "https://sepolia-optimism.etherscan.io"
                },
            },
            {
                network: "arb_sepolia",
                chainId: 421614,
                urls: {
                    apiURL: "https://api-sepolia.arbiscan.io/api",
                    browserURL: "https://sepolia.arbiscan.io"
                },
            },
            {
                network: "boba_eth_mainnet",
                chainId: 288,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/mainnet/evm/288/etherscan",
                    browserURL: "https://bobascan.com"
                },
            },
            {
                network: "boba_bnb_mainnet",
                chainId: 56288,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/mainnet/evm/56288/etherscan",
                    browserURL: "https://bobascan.com"
                },
            },
            {
                network: "boba_goerli",
                chainId: 2888,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/2888/etherscan",
                    browserURL: "https://testnet.bobascan.com"
                },
            },
            {
                network: "boba_sepolia",
                chainId: 28882,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/28882/etherscan",
                    browserURL: "https://testnet.bobascan.com"
                },
            },
            {
                network: "boba_bnb_testnet",
                chainId: 9728,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/9728/etherscan",
                    browserURL: "https://testnet.bobascan.com"
                },
            }
        ],
    }
}

export default config
