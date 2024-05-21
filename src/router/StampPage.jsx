import "../style/stamp.css";
import Layout from "../components/Layout";
import GrayStamp from "../assets/stampGray.svg";
import GreenStamp from "../assets/stampGreen.svg";
import BlackStamp from "../assets/stampBlack.js";
import DropDown from "../components/DropDown";
import { ColorBlindContext, useTheme } from "../context/themeProvider.js";
import { useContext, useEffect, useState } from "react";
import IsLogin from "../components/IsLogin.js";
import { apiStampInfo } from "../api.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StampSkel({ length }) {
  const [ThemeMode] = useTheme();
  return (
    <div className="stamp-box">
      {Array.from({ length: length }).map((_, idx) => (
        <Skeleton key={idx} height={140} width={140} circle={true} duration={1} baseColor={ThemeMode === "dark" ? "#2a2a2a" : "#ebebeb"} highlightColor={ThemeMode === "dark" ? "#232323" : "#f5f5f5"} />
      ))}
    </div>
  );
}

export default function StampPage() {
  const [stampArray, setStampArray] = useState([]);
  const [user, setUser] = useState(null);
  const { isBlind } = useContext(ColorBlindContext);
  const updateUser = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    if (user) {
      const res = apiStampInfo(user.token, user.user_id);
      res.then((result) => {
        setStampArray(result.data);
      });
    }
  }, [user]);

  const [ThemeMode] = useTheme();

  return (
    <Layout>
      <IsLogin updateUser={updateUser} />
      <div className="stamp-section">
        {stampArray.length > 0 ? (
          <>
            {/* 드롭다운 */}
            <DropDown count={stampArray.filter((s) => s.is_collected === 1).length} />
            {/* 스탬프 */}
            <div className="stamp-box">
              {stampArray.map((stamp) => (
                <p key={stamp.stamp_id}>
                  {stamp.is_collected !== 1 ? (
                    <img src={GrayStamp} alt="미완성 스탬프" />
                  ) : (
                    <>
                      {isBlind === false && <img src={GreenStamp} alt="완성 스탬프" />}
                      {isBlind === true && ThemeMode === "dark" && <BlackStamp fillColor="#fff" />}
                      {isBlind === true && ThemeMode === "light" && <BlackStamp fillColor="#000" />}
                    </>
                  )}
                </p>
              ))}
            </div>
          </>
        ) : (
          <>
            <Skeleton height={100} width={310} className="SkeletonDrop" duration={1} baseColor={ThemeMode === "dark" ? "#2a2a2a" : "#ebebeb"} highlightColor={ThemeMode === "dark" ? "#232323" : "#f5f5f5"} />
            <StampSkel length={6} />
          </>
        )}
        <div id="stampInfo">보상은 수목원 관리사무실에서 수령할 수 있습니다.</div>
      </div>
    </Layout>
  );
}
