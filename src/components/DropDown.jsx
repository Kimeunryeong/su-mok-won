import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTheme } from "../context/themeProvider";
import { FaTooth, FaSoap, FaBagShopping } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import stampCircle from "../assets/stampCircle.svg";

function DropdownBtn({ onClick, icon, text1, text2, border }) {
  return (
    <button onClick={onClick} className={`w-full px-4 py-3 grid grid-cols-[1fr_185px] justify-center items-center gap-x-4 ${border} border-white text-lg`} role="menuitem">
      <div className="w-[60px] h-[60px] bg-white rounded-full justify-self-end flex justify-center items-center">{icon}</div>
      <div className="text-left">
        <p className="font-semibold">{text1}</p>
        <p>{text2}</p>
      </div>
    </button>
  );
}

export default function DropdownMenu({ count }) {
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState([t(`stampPage.sp0`), t(`stampPage.sp1`), FaTooth]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ThemeMode] = useTheme();
  const menuRef = useRef(null);
  let IconImg = selectedMenu[2];

  //   메뉴 선택하면 닫히게
  const handleMenuClick = (text) => {
    setSelectedMenu(text);
    setMenuOpen(false);
  };

  //   메뉴 외 클릭시 닫히게
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
  useEffect(() => {
    if (1 < count && count <= 3) {
      setSelectedMenu([t(`stampPage.sp2`), t(`stampPage.sp3`), FaSoap]);
    } else if (3 < count) {
      setSelectedMenu([t(`stampPage.sp4`), t(`stampPage.sp5`), FaBagShopping]);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [count]);

  return (
    <div className="relative my-7 inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className={`relative grid grid-cols-[1fr_190px] justify-center items-center rounded-md w-[310px] px-2 py-5 text-lg gap-x-4 ${ThemeMode === "dark" ? "bg-[#2e2e2e] text-white" : "bg-[#E6E6E6] text-inherit"}`}
          onClick={() => setMenuOpen(!menuOpen)} // 버튼 클릭 시 메뉴 열기/닫기 토글
        >
          <div className="w-[60px] h-[60px] bg-white rounded-full justify-self-end flex justify-center items-center">
            <IconImg size="35px" color="#666" />
          </div>
          <div className="text-left">
            <p className="font-semibold">{selectedMenu[0]}</p>
            <p>{selectedMenu[1]}</p>
          </div>
          <IoMdArrowDropdown className="absolute right-3" size="30px" />
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <div className={`origin-top-right absolute right-0 w-full rounded-md shadow-lg mt-1 ${ThemeMode === "dark" ? "bg-[#2e2e2e] text-white" : "bg-[#E6E6E6] text-inherit"}`}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <DropdownBtn onClick={() => handleMenuClick([t(`stampPage.sp0`), t(`stampPage.sp1`), FaTooth])} text1={t(`stampPage.sp0`)} text2={t(`stampPage.sp1`)} border="border-b" icon={<FaTooth size="35px" color="#666" />} />
            <DropdownBtn onClick={() => handleMenuClick([t(`stampPage.sp2`), t(`stampPage.sp3`), FaSoap])} text1={t(`stampPage.sp2`)} text2={t(`stampPage.sp3`)} border="border-b" icon={<FaSoap size="35px" color="#666" />} />
            <DropdownBtn onClick={() => handleMenuClick([t(`stampPage.sp4`), t(`stampPage.sp5`), FaBagShopping])} text1={t(`stampPage.sp4`)} text2={t(`stampPage.sp5`)} icon={<FaBagShopping size="35px" color="#666" />} />
          </div>
        </div>
      )}
    </div>
  );
}
