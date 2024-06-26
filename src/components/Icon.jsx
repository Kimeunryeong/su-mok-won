import React, { useContext } from "react";
import { FaHome, FaMap, FaStamp } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ColorBlindContext, useTheme } from "../context/themeProvider";

export default function Icon({ text, icon, size, green }) {
  const [ThemeMode] = useTheme();
  const { isBlind } = useContext(ColorBlindContext);
  let IconImg;
  switch (icon) {
    case "home":
      IconImg = FaHome;
      break;
    case "map":
      IconImg = FaMap;
      break;
    case "stamp":
      IconImg = FaStamp;
      break;
    case "user":
      IconImg = FaGear;
      break;
    default:
      break;
  }

  return (
    <div className={`flex flex-col items-center ${ThemeMode === "dark" && green ? "text-[#119724]" : ThemeMode === "dark" && !green ? "text-[#f1f1f1]" : ThemeMode !== "dark" && green && isBlind ? "text-black" : ThemeMode !== "dark" && green ? "text-[#119724]" : "text-[#808080]"}`}>
      <IconImg className="mb-1" size={size} />
      <p className="text-xs">{text}</p>
    </div>
  );
}
