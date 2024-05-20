import React from "react";
import { Link } from "react-router-dom";
import Kakao from "../assets/kakaoLogo.png";
import Google from "../assets/googleLogo.svg";

export default function Socials({ txt1, txt2, finalUrl, googleUrl }) {
  return (
    <div className="flex flex-col mt-4">
      <div className="w-[300px] h-[50px] bg-[#FEE500] rounded-lg flex justify-around items-center mb-3">
        <img className="w-[50px] h-[100%] object-contain" src={Kakao} alt="kakao" />
        <Link to={finalUrl} className="no-underline text-black">
          <p className="flex items-center justify-center text-xl font-semibold">{txt1}</p>
        </Link>
        <span className="w-[10%]"></span>
      </div>
      <div className="w-[300px] h-[50px] bg-[#F2F2F2] rounded-lg flex justify-around items-center mb-3">
        <img className="w-[50px] h-[100%] cursor-pointer object-contain" src={Google} alt="google" />
        <Link to={googleUrl} className="no-underline text-black">
          <p className="flex items-center justify-center text-xl font-semibold">{txt2}</p>
        </Link>
        <span className="w-[10%]"></span>
      </div>
    </div>
  );
}
