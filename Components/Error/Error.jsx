import React from "react";
import Image from "next/image";
import Style from "./Error.module.css"
import imags from "../../assets";
const Error =({error})=>{

    return (
        <div className={Style.Error}>
            <div className={Style.Error_box}>
                <h1>Plese Fix This Error & Reload Browser</h1>
                {error}
            </div>
        </div>
    )
}

export default Error