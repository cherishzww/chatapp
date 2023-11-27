import React,{useEffect,useState,useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./Friend.module.css"
import { ChatAppContext } from "../../context/ChatAppContext";
import { Model,Error } from "../index";
import imags from "../../assets"
import Card  from "./Card/Card";
import Chat from "./Chat/Chat";

const Friend=()=>{
    const {loading,sendMessage,account,friendLists,readMessage,userName,currentUserName,
        currentAddress,readUser,friendMsg} = useContext(ChatAppContext);
    return (
        <div className={Style.Friend}>
            <div className={Style.Friend_box}>
                <div className={Style.Friend_box_letf}>
                    {friendLists.map((el,i)=>(
                        <Card
                            key={i +1}
                            el={el}
                            i = {i}
                            readMessage={readMessage}
                            readUser={readUser}              
                        ></Card>
                    ))}

                </div>
                <div className={Style.Friend_box_right}>
                    <Chat functionName={sendMessage}
                            readMessage={readMessage} 
                            friendMsg={friendMsg}
                            account={account}
                            userName={userName}
                            loading={loading}
                            currentUserName={currentUserName}
                            currentAddress={currentAddress}
  
                    ></Chat>

                </div>
            </div>
        </div>
    )
}

export default Friend;