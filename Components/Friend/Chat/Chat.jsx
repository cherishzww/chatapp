import React,{useEffect,useState,useContext} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import imags from "../../../assets"
import Style from"./Chat.module.css"
import{Loader} from "../../index"
import { converTime } from "../../../Utils/apiFeature";

const Chat=({readMessage,functionName,
    friendMsg,account,userName,loading,currentUserName,currentAddress,readUser})=>{

    // const {converTime} = useContext(ChatAppContext);
    const[message,setMessage] = useState("");
    const[chatData,setChatData] = useState({
        name:"",
        address:"",
        i:"",
    });

    const router = useRouter();
    // useEffect(()=>{
    //     if(!router.isReady) return;
    //     setChatData(router.query);
    //     console.log("chatData.i value:", chatData.i);
    // },[router.isReady])
    useEffect(() => {
        if (!router.isReady) return;
        setChatData(router.query);
    }, [router.isReady, router.query]);
    
    useEffect(() => {
        console.log("Updated chatData.i value:", chatData.i);
    }, [chatData]);
    
    return (
        <div className={Style.Chat}>
            {currentUserName && currentAddress?(
                <div className={Style.Chat_user_info}>
                      <Image src={imags[`image${parseInt(chatData.i, 10) + 1}`]}
                        alt="image"
                        width={70}
                        height={70}

                    />
                    <div className={Style.Chat_user_info_box}>
                        <h4>{currentUserName}</h4>
                        <p className={Style.show}>{currentAddress}</p>
                    </div>
       
                 </div>
            ):("")}

            <div className={Style.Chat_box_box}>
                <div className={Style.Chat_box}>
                    <div className={Style.Chat_box_left}>
                        {
                            friendMsg.map((el,i)=>(
                                <div  key={el.id || i}>
                                    {el.sender==chatData.address?(
                                        <div className={Style.Chat_box_left_title}>
                                             <Image  src={imags[`image${parseInt(chatData.i, 10) + 1}`]}
                                                alt="image"
                                                width={50}
                                                height={50}
                                              />
                                              <span>
                                                {chatData.name}{""}
                                                <small>   Time: {converTime(el.timestamp.toString() * 1000)}</small>
                                              </span>
                                        </div>
                                    ):(
                                        <div className={Style.Chat_box_left_title}>
                                               <Image src={imags.zhuweiwei}
                                                alt="image"
                                                width={50}
                                                height={50}
                                              />
                                              <span>
                                                {userName}{""}
                                                <small>   Time: {converTime(el.timestamp.toString() * 1000)}</small>
                                              </span>
                                        </div>
                                    )}
                                    <p key={i+1} className={Style.p}>
                                        {el.msg}
                                        {""}
                                        {""}
                                        </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {currentAddress&&currentUserName?(
                    <div className={Style.Chat_box_send}>
                           <div className={Style.Chat_box_send_img}>
                                <Image src={imags.smile} alt="smile"
                                    width={50}
                                    height={50}
                                ></Image>
                                <input type="text" placeholder="type your message"
                                    onChange={(e)=>setMessage(e.target.value)}                                
                                />
                                <Image src={imags.file}
                                    alt="file"
                                    width={50}
                                    height={50}
                                ></Image>
                                {
                                    loading ==true?(<Loader/>):(
                                    <Image src={imags.send}
                                    alt="send"
                                    width={50}
                                    height={50}
                                    onClick={()=>functionName({msg:message,friendAddress:chatData.address})}
                                ></Image>
                                    )
                                }
                           </div>
                           <div className={Style.Chat_box_send_right}></div>
                    </div>
                ):("")}
            </div>
        </div>
    )
}

export default Chat;