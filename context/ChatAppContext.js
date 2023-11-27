import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
  converTime,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  // const title = "Hey welcome to blockChain chatAPP";
  //定义数据变量
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //聊天用户数据
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  const router = useRouter();

  //加载数据
  const fetchData = async () => {
    try {
      //获取智能合约
      const contract = await connectingWithContract();
      //获取account
      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      //调用智能合约方法获取用户名
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);

      // //获取好友列表
      const friendLists = await contract.getMyFriendList(connectAccount);
      setFriendLists(friendLists);

      //获取所有用户
      const userLists = await contract.getAllAppUser();
      setUserLists(userLists);
    } catch (error) {
      setError("please Install And Connect Your wallet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //获取聊天记录
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("No news at this time.");
    }
  };

  //创建用户
  const creatAccount = async ({ name, accountAddress }) => {
    try {
      if (name) return setError("Username  cannot be empty.");
      const contract = await connectingWithContract();
      const getCreatAccount = await contract.createAccount(name);
      setLoading(true);
      await getCreatAccount.wait();
      setLoading(false);
    } catch (error) {
      setError("Failed to create user, please reload browser.");
    }
  };

  //添加朋友
  const addYourFriend = async ({ friendAddress, friendName }) => {
    try {
      if (!friendAddress && !friendName)
        return setError("friendAddress and friendName cannot be empty.");
      const contract = await connectingWithContract();
      const addFriend = await contract.addFriend(friendAddress, friendName);
      console.log(friendAddress);
      console.log(friendName);
      setLoading(true);
      await addFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Error adding friend.");
    }
  };

  //发送信息给你的朋友

  const sendMessage = async ({ msg, friendAddress }) => {
    try {
      if (!msg) return setError("friendAddress and msg cannot be empty.");
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(friendAddress, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //获取用户信息
  const readUser = async (userAdress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUserName(userAdress);
    setCurrentUserName(userName);
    setCurrentAddress(userAdress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        creatAccount,
        addYourFriend,
        sendMessage,
        readUser,
        CheckIfWalletConnected,
        connectWallet,
        converTime,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
