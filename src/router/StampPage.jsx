import "../style/stamp.css";
import Layout from "../components/Layout";
import GrayStamp from "../assets/stampGray.svg";
import GreenStamp from "../assets/stampGreen.svg";
import BlackStamp from "../assets/stampBlack.js";
import DropDown from "../components/DropDown";
import { useTheme } from "../context/themeProvider.js";
import { useState } from "react";
import IsLogin from "../components/IsLogin.js";
import { apiStampInfo } from "../api.js";

export default function StampPage() {
  const stampArray =[]
  const [user, setUser] = useState(null);
  const updateUser = (userData) => {
    setUser(userData);
  };
  if(user) {
    const res = apiStampInfo(user.token, user.user_id);
    res.then(result => {
      result.data.forEach(obj => {
        stampArray.push(obj)
      })
    });
  }
  const [ThemeMode] = useTheme();
  return (
    <Layout>
      <IsLogin updateUser={updateUser} />
      <div className="stamp-section">
        {/* 드롭다운 */}
        <DropDown />
        {/* 스탬프 */}
        <div className="stamp-box">
          <p>
            <img src={GrayStamp} alt="미완성 스탬프" />
            <img id="greenStamp" src={GreenStamp} alt="완성 스탬프" />
            <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
          </p>
          <p>
            <img src={GrayStamp} alt="미완성 스탬프" />
            <img id="greenStamp" src={GreenStamp} alt="완성 스탬프" />
            <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
          </p>
          <p>
            <img src={GrayStamp} alt="미완성 스탬프" />
            <img id="greenStamp" src={GreenStamp} alt="완성 스탬프" />
            <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
          </p>
          <p>
            <img src={GrayStamp} alt="미완성 스탬프" />
            <img id="greenStamp" src={GreenStamp} alt="완성 스탬프" />
            <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
          </p>
          <p>
            <img src={GrayStamp} alt="미완성 스탬프" />
            <img id="greenStamp" src={GreenStamp} alt="완성 스탬프" />
            <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
          </p>
          <p>
            <img src={GrayStamp} alt="미완성 스탬프" />
            <img id="greenStamp" src={GreenStamp} alt="완성 스탬프" />
            <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
          </p>
        </div>
      </div>
    </Layout>
  );
}
