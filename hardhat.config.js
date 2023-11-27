require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // local:{
    //   url:"http://127.0.0.1:8545",
    //   chainId:31337,
    //   accounts:[process.env.PRIVATE_KEY]
    // },
    polygon: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY],
    },
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/5SDrsuBbkOy92dWIvJMPe4UKVmz3O3Yh",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY],
      blockConfirmations: 6,
    },
  },
};
