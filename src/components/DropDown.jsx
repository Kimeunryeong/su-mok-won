import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTheme } from "../context/themeProvider";
import { FaTooth, FaSoap, FaBagShopping } from "react-icons/fa6";

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

export default function DropdownMenu() {
  const [selectedMenu, setSelectedMenu] = useState(["스탬프 1개", "생분해 대나무 칫솔", FaTooth]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ThemeMode, toggleTheme] = useTheme();
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
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
            <DropdownBtn onClick={() => handleMenuClick(["스탬프 1개", "생분해 대나무 칫솔", FaTooth])} text1="스탬프 1개" text2="생분해 대나무 칫솔" border="border-b" icon={<FaTooth size="35px" color="#666" />} />
            <DropdownBtn onClick={() => handleMenuClick(["스탬프 3개", "친환경 설거지 비누", FaSoap])} text1="스탬프 3개" text2="친환경 설거지 비누" border="border-b" icon={<FaSoap size="35px" color="#666" />} />
            <DropdownBtn onClick={() => handleMenuClick(["스탬프 6개", "업사이클링 에코백", FaBagShopping])} text1="스탬프 6개" text2="업사이클링 에코백" icon={<FaBagShopping size="35px" color="#666" />} />
          </div>
        </div>
      )}
    </div>
  );
}
