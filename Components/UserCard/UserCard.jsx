import React from "react";
import Image from "next/image";
import Style from "./UserCard.module.css";
import imags from "../../assets"
const UserCard=({el,i,addYourFriend})=>{
    return (
        <div className={Style.UserCard}>
            <div className={Style.UserCard_box}>
                <Image src={imags[`image${i+1}`]}
                //   <Image src={imags.zhuweiwei}
                    alt="user"
                    width={100}
                    height={100}
                    className={Style.UserCard_box_img}
                ></Image>

            <div className={Style.UserCard_box_info}>
                <h3>{el.name}</h3>
                <p>{el.accountAddress.slice(0,25)}..</p>
                <button onClick={() => addYourFriend({ friendAddress: el.accountAddress, friendName: el.name })}>
                    Add Friend
                </button>
            </div>
            </div>
            <small className={Style.number}>
                {i + 1}
            </small>
        </div>
    )
}

export default UserCard;