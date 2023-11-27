import React ,{useState,useContext}from "react";
import Image from "next/image";
import Style from "./Model.module.css";
import imags from "../../assets";
import { ChatAppContext } from "../../context/ChatAppContext";
import { Loader } from "../../Components/index";

const Model =({ openBox, title, head, info, smallinfo, image, address,functionName })=>{

    const[name,setName] = useState("");
    const[accuntAddress,setAccuntAddress] = useState("");
    const{loading} = useContext(ChatAppContext);
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}>
                    <Image src={image} alt="buddy" width={1000} height={1000}></Image>
                </div>
                <div className={Style.Model_box_right}>
                    <h1>
                    {title}<span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallinfo}</small>
                    {loading ==true ?(
                        <Loader/>
                    ):(
                        <div className={Style.Model_box_right_name}>
                        <div className={Style.Model_box_right_name_info}>
                            <Image src={imags.username} alt="user" width={30} height={30}></Image>
                            <input type="text" placeholder="Your name"  
                            onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className={Style.Model_box_right_name_info}>
                            <Image src={imags.account} alt="user" width={30} height={30}></Image>
                            <input type="text" placeholder={address|| "Enter address..."} 
                            onChange={(e)=>setAccuntAddress(e.target.value)}/>
                        </div>
                        <div className={Style.Model_box_right_name_btn}>
                            <button
                                onClick={()=>
                                    functionName({name,accuntAddress})}
                            >
                                {""}
                                <Image src={imags.send} alt="send" width={30} height={30}></Image>
                                {""}
                                Submit
                            </button>

                            <button
                                onClick={()=>openBox(false)}
                            >
                                {""}
                                <Image src={imags.close} alt="close" width={30} height={30}></Image>
                                {""}
                                Cancle
                            </button>
                        </div>
                    </div>
                    )
                }
                    
                </div>
            </div>
        </div>
    )
}

export default Model;