import React,{useEffect,useState,useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./NavBar.module.css"
import { ChatAppContext } from "../../context/ChatAppContext";
import { Model,Error } from "../index";
import imags from "../../assets"
const NavBar=()=>{

    const  mentItems =[
        {
        menu:"All Users",
        link:"alluser",
    },
    {
        menu:"CHAT",
        link:"/",
    },
    {
        menu:"CONTACT",
        link:"/",
    },
    {
        menu:"SETTING",
        link:"/",
    },
    {
        menu:"TEAM OF US",
        link:"/",
    },
];
const [active,setActive] = useState(2);
const [open,setOpen] = useState(false);
const [openModel,setOpenModel] = useState(false);

const {account,userName,connectWallet,creatAccount,error} = useContext(ChatAppContext);
    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <Image src={imags.logo} alt="logo" width={50} height={50}></Image>
                </div>
                <div className={Style.NavBar_box_right}>
                    {/* 电脑端打开的菜单 */}
                    <div  className={Style.NavBar_box_right_menu}>
                        {mentItems.map((el,i)=>(
                            <div onClick={()=>
                                setActive(i+1)}
                                key = {i + 1}
                                className={`${Style.NavBar_box_right_menu_items} ${
                                    active === i + 1 ? Style.active_btn : ""
                                  }`}
                            >
                                <Link
                                    className={Style.NavBar_box_right_menu_items_link}
                                    href={el.link}
                                    >
                                    {el.menu}
                                    </Link>
                            </div>
                        ))}
                        
                    </div>
                    {/* 手机端打开的菜单 */}
                    {open &&(
                         <div  className={Style.mobile_menu}>
                         {mentItems.map((el,i)=>(
                             <div onClick={()=>
                                 setActive(i+1)}
                                 key = {i + 1}
                                 className={`${Style.mobile_menu_items} ${
                                     active === i + 1 ? Style.active_btn : ""
                                   }`}
                             >
                                 <Link
                                     className={Style.mobile_menu_items_link}
                                     href={el.link}
                                     >
                                     {el.menu}
                                     </Link>
                             </div>
                         ))}
                         <p className={Style.mobile_menu_btn}>
                            <Image src ={imags.close} alt="close"
                             width={50} height={550}>
                             onClick={()=>setOpen(false)} 
                             </Image>
                         </p>
                     </div>
                    )}


                    {/* 链接钱包 */}
                    <div className={Style.NavBar_box_right_connect}>
                        {account ==="" ? (
                            <button onClick={()=>connectWallet()}>
                                {""}
                                <span>Connect wallet</span>
                            </button>
                        ):(
                            <button onClick={()=>setOpenModel(true)}>
                                {""}
                                <Image src={userName ?imags.zhuweiwei :imags.creat2}
                                alt ="Account image"
                                width={20}
                                height={20}
                                ></Image>
                                <small>{userName || "Create Account"}</small>
                            </button>
                        )}
                    </div>
                    <div className={Style.NavBar_box_right_open}
                    onClick={()=>setOpen(true)}
                    >
                        <Image src={imags.open} alt ="open" width={30} height={30}></Image>
                    </div>
                </div>
            </div>
            {/* // 模型 */}
        {openModel &&(
            <div className={Style.modelBox}>
            <Model openBox={setOpenModel}
                 title = "WELCOME TO"
                 head = "Blockchain Chat"
                 info="Welcome to the Chat Haven! 
                 We're thrilled to have you join our community of passionate conversationalists. Whether you're here to make friends, share ideas, or seek advice, you'll find open ears and warm hearts. Dive into the discussions, and let's make meaningful connections. Happy chatting!"
                 smallinfo ="Kindley seclet your name..."
                 image={imags.hero}
                 functionName={creatAccount}
                 address={account}
            ></Model>                   
            </div>
        )}
        {error==""?"":<Error error={error}/>}
        </div>
    );
}

export default NavBar;