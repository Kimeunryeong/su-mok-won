import { Link } from "react-router-dom";
import "../style/menubar.css";
import Icon from "./Icon";
import { useTheme } from "../context/themeProvider.js";
import { TbLineScan } from "react-icons/tb";
import { useLocation } from "react-router-dom";

export default function MenuBar() {
  const [ThemeMode, toggleTheme] = useTheme();
  const { pathname } = useLocation();
  return (
    <>
      <nav className={`fixed bottom-0 w-full h-[70px] ${ThemeMode === "dark" ? "bg-[#292929]" : "bg-[#f1f1f1]"} flex items-center justify-between px-2`}>
        <Link to="/home" className="w-[60px]">
          <Icon text="홈" icon="home" size="30px" green={pathname === "/home" ? "green" : ""} />
        </Link>
        <Link to="/map" className="w-[60px]">
          <Icon text="지도" icon="map" size="30px" green={pathname === "/map" ? "green" : ""} />
        </Link>
        <Link to="/qr" className={`relative w-[75px] h-[75px] rounded-full ${ThemeMode === "dark" ? "bg-[#292929]" : "bg-[#f1f1f1]"} mb-[60px] flex flex-col items-center justify-center`}>
          <div className={`absolute ${ThemeMode === "dark" ? "bg-black" : "bg-white"} w-[55px] h-[55px] rounded-full flex items-center justify-center`}>
            <TbLineScan className="text-4xl" />
          </div>
          <p className={`absolute top-[76px] text-xs ${ThemeMode === "dark" ? "text-[#f1f1f1]" : "text-[#808080]"}`}>QR 촬영</p>
        </Link>
        <Link to="/stamp" className="w-[60px]">
          <Icon text="스탬프" icon="stamp" size="26px" green={pathname === "/stamp" ? "green" : ""} />
        </Link>
        <Link to="/mypage" className="w-[60px]">
          <Icon text="마이페이지" icon="user" size="26px" green={pathname === "/mypage" ? "green" : ""} />
        </Link>
      </nav>
    </>
  );
}
