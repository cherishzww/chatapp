import React, { useEffect, useState, useContext } from "react";
import { Filter, Friend } from "../Components/index";

const ChatApp = () => {
  return (
    <div>
      <Filter></Filter>
      <Friend></Friend>
    </div>
  );
};

export default ChatApp;
