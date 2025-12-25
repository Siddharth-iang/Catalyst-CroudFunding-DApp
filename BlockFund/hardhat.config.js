require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      // I have pasted your URL and Key directly here to bypass the error
      url: "https://sepolia.infura.io/v3/bbd9d58fe2e44eeea6617628dddc185c",
      accounts: ["0x1abd7ea8880f266c9dffbab608d59782b5744486704057a817409ca0de45e10a"]
    }
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/abis",
  },
  mocha: {
    timeout: 40000,
  },
};