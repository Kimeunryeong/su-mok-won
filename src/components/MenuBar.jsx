import { Link } from "react-router-dom";
import "../style/menubar.css";
import Icon from "./Icon";
import { useTheme } from "../context/themeProvider.js";
import { TbLineScan } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function MenuBar() {
  const { t } = useTranslation();
  const [ThemeMode] = useTheme();
  const { pathname } = useLocation();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const qrRef = useRef();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrRef.current]);

  return (
    <>
      <nav className={`fixed bottom-0 z-20 w-full h-[70px] ${ThemeMode === "dark" ? "bg-[#292929]" : "bg-[#f1f1f1]"} flex items-center justify-between px-2`}>
        <Link to="/home" className="w-[60px]">
          <Icon text={t(`menu.home`)} icon="home" size="30px" green={/^(\/home|\/introsumok|\/indoorinfo|\/shelterinfo|\/indoorinfo2|\/)$/.test(pathname) ? true : false} />
        </Link>
        <Link to="/map" className="w-[60px]">
          <Icon text={t(`menu.map`)} icon="map" size="30px" green={pathname === "/map" ? true : false} />
        </Link>
        <div id="qrCode" ref={qrRef}>
          <Link to="/qr" className={`relative w-[75px] h-[75px] rounded-full ${ThemeMode === "dark" ? "bg-[#292929]" : "bg-[#f1f1f1]"} mb-[60px] flex flex-col items-center justify-center`}>
            <div className={`absolute ${ThemeMode === "dark" ? "bg-[#0c0c0c]" : "bg-white"} w-[55px] h-[55px] rounded-full flex items-center justify-center`}>
              <TbLineScan className="text-4xl" />
            </div>
            <p className={`absolute top-[76px] text-xs ${ThemeMode === "dark" ? "text-[#f1f1f1]" : "text-[#808080]"}`}>{t(`menu.qr`)}</p>
          </Link>
        </div>
        <Link to="/stamp" className="w-[60px]">
          <Icon text={t(`menu.stamp`)} icon="stamp" size="26px" green={pathname === "/stamp" ? true : false} />
        </Link>
        <Link to="/mypage" className="w-[60px]">
          <Icon text={userData ? t(`menu.mypage`) : t(`menu.mypage2`)} icon="user" size="26px" green={/^(\/mypage|\/login|\/signup)$/.test(pathname) ? true : false} />
        </Link>
      </nav>
    </>
  );
}
