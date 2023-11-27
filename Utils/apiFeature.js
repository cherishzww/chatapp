import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI } from "../context/constants";

//检查浏览器是否安装metamask 如果安装返回第一个账户
export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const fristAccount = accounts[0];
    return fristAccount;
  } catch (error) {
    console.log(error);
  }
};

//链接钱包 返回第一个账户
export const connectWallet = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const fristAccount = accounts[0];
    return fristAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);
};

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

// export const converTime = (time) => {
//   const newTime = new Date(time.toNumber());
//   const realTime =
//     newTime.getHours() +
//     "/" +
//     newTime.getMinutes() +
//     "/" +
//     newTime.getSeconds() +
//     "Date:" +
//     newTime.getDate() +
//     "/" +
//     (newTime.getMonth() + 1) +
//     "/" +
//     newTime.getFullYear();

//   return realTime;
// };

export const converTime = (bigNumberTimestamp) => {
  // 尝试转换为数字
  let timestamp = bigNumberTimestamp.toNumber
    ? bigNumberTimestamp.toNumber()
    : parseInt(bigNumberTimestamp.toString());

  // 由于不确定bigNumberTimestamp的单位是秒还是毫秒，这里需要你确认
  // 如果单位是秒，则需要将其乘以1000
  // timestamp *= 1000; // 取消注释这行，如果时间戳单位是秒

  // 创建Date对象
  const newTime = new Date(timestamp);
  const realTime =
    newTime.getHours().toString().padStart(2, "0") +
    ":" +
    newTime.getMinutes().toString().padStart(2, "0") +
    ":" +
    newTime.getSeconds().toString().padStart(2, "0") +
    " Date:" +
    newTime.getDate().toString().padStart(2, "0") +
    "/" +
    (newTime.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    newTime.getFullYear();

  return realTime;
};
