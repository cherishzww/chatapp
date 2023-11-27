import React ,{useState,useContext}from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import imags from "../../assets";
import { ChatAppContext } from "../../context/ChatAppContext";
import { Model } from "../index";
const Filter =()=>{
    const{account,addYourFriend} = useContext(ChatAppContext);
    const[addFriend,setAddFriend]=useState(false);
    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_letf}>
                    <div className={Style.Filter_box_letf_search}>
                        <Image src={imags.search} alt="search" width={50} height={50}></Image>
                        <input type="text" placeholder="search.." />
                    </div>

                </div>
                <div className={Style.Filter_box_right}>
                    {/* <button>
                    <Image src={imags.clear} alt="clear" width={50} height={50}></Image>
                        Clear CHAT
                    </button> */}
                    <button onClick={()=>setAddFriend(true)}>
                    <Image src={imags.username} alt="addFriend" width={50} height={50}></Image>
                        ADD FRIEND
                    </button>
                </div>
            </div>
            {/* model component */}
            {addFriend &&(
                <div className={Style.Filter_model}> 
                    <Model openBox={setAddFriend}
                        title = "WELCOME TO"
                        head = "Blockchain Chat"
                        info="Welcome to the Chat Haven! 
                        We're thrilled to have you join our community of passionate conversationalists. Whether you're here to make friends, share ideas, or seek advice, you'll find open ears and warm hearts. Dive into the discussions, and let's make meaningful connections. Happy chatting!"
                        smallinfo ="Kindley seclet your friend name and address"
                        image={imags.hero}
                        functionName={addYourFriend}
                        address={account}
                    ></Model>
                </div>
            )}
        </div>
    )
}

export default Filter;