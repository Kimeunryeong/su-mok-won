import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import headerLogo from "../assets/gpsLogo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navi = useNavigate();
  return (
    <div className="w-full max-w-[400px] h-[60px] relative flex justify-center items-center">
      <div
        className="absolute top-6 left-5 z-10"
        onClick={() => navi(-1)}
      >
        <IoIosArrowBack />
      </div>
      <div className="absolute w-full h-full flex items-center justify-center">
        <img className="mr-2 h-[50%]" src={headerLogo} alt="logo" />
        <span className="text-2xl text-[#119724] font-semibold ffTitle">
          대구수목원
        </span>
      </div>
    </div>
  );
}
