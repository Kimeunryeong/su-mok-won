import "../style/stamp.css";
import Layout from "../components/Layout";
import GrayStamp from "../assets/stampGray.svg";
import GreenStamp from "../assets/stampGreen.svg";
import BlackStamp from "../assets/stampBlack.js";
import DropDown from "../components/DropDown";
import { useTheme } from "../context/themeProvider.js";
import { useEffect, useState } from "react";
import IsLogin from "../components/IsLogin.js";
import { apiStampInfo } from "../api.js";

export default function StampPage() {
  const [stampArray, setStampArray] = useState([]);
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    if (user) {
      const res = apiStampInfo(user.token, user.user_id);
      res.then(result => {
        setStampArray(result.data);
      });
    }
  }, [user]);

  const [ThemeMode] = useTheme();

  return (
    <Layout>
      <IsLogin updateUser={updateUser} />
      <div className="stamp-section">
        {/* 드롭다운 */}
        <DropDown />
        {/* 스탬프 */}
        <div className="stamp-box">
          {stampArray.map((stamp) => (
            <p key={stamp.stamp_id}>
              <img src={stamp.is_collected===1 ? GreenStamp : GrayStamp} alt={stamp.is_collected===1 ? "완성 스탬프" : "미완성 스탬프"} />
              <BlackStamp fillColor={ThemeMode === "dark" ? "#fff" : "#000"} />
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}
