import React, { useEffect, useState, useContext } from "react";
import { UserCard } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContext } from "../context/ChatAppContext";

const alluser = () => {
  const { userLists, addYourFriend } = useContext(ChatAppContext);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists.map((el, i) => (
          <UserCard
            key={i + 1}
            el={el}
            i={i}
            addYourFriend={addYourFriend}
          ></UserCard>
        ))}
      </div>
    </div>
  );
};

export default alluser;
