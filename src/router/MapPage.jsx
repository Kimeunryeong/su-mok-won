import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import KakaoMap from "../components/KakaoMap";
import { stampPositions, toiletPositions, parkPositions, cafePosition } from "../lib/positions.js";
import { FaRestroom } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { TbLineScan } from "react-icons/tb";
import { useTheme } from "../context/themeProvider.js";
import { useTranslation } from "react-i18next";
import i18n from "../context/i18n.js";
import { stampPositionsEng, toiletPositionsEng, parkPositionsEng, cafePositionEng } from "../lib/positionsEng.js";
import Mymarker from "../assets/myMarker.svg";

function MapBtn({ onClick, txt, border, Icon, bg }) {
  return (
    <button className={`w-[100px] py-3 border-2 rounded-md flex flex-col items-center justify-around ${border ? `border-[#119724] font-semibold ${bg && "bg-[#464646]"}` : "border-gray-300"} ${bg ? "bg-[#232325]" : "bg-gray-100"}`} onClick={onClick}>
      <Icon className=" text-[40px] text-[#119724] mb-2" />
      <p>{txt}</p>
    </button>
  );
}

export default function MapPage() {
  const { t } = useTranslation();
  const [ThemeMode] = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [iwContent] = useState("");
  const [markers, setMarkers] = useState("스탬프");

  // 내 위치 가져오기 함수
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("내 위치 가져오기 실패:", error);
          setErrorMessage("내 위치를 가져오는 중에 오류가 발생했습니다.");
        }
      );
    } else {
      console.error("브라우저가 Geolocation API를 지원하지 않습니다.");
      setErrorMessage("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  };

  // 사용자의 위치가 변경될 때마다 KakaoMap 컴포넌트를 다시 렌더링
  useEffect(() => {
    getCurrentLocation();
  }, [markers]);

  // 각 버튼 클릭 이벤트 핸들러
  // const handleButtonClick = (latitude, longitude, locationName) => {
  //   setUserLocation({ latitude, longitude });
  //   setIwContent(`<div style="padding: 10px;">${locationName}</div>`); // 클릭된 버튼의 위치를 사용자의 위치로 설정
  // };

  // 마커 표시할 장소 목록
  let positions;
  if (i18n.language === "ko") {
    switch (markers) {
      case "스탬프":
        positions = stampPositions;
        break;
      case "주차장":
        positions = parkPositions;
        break;
      case "카페/쉼터":
        positions = cafePosition;
        break;
      case "화장실":
        positions = toiletPositions;
        break;
      default:
        break;
    }
  } else if (i18n.language === "en") {
    switch (markers) {
      case "스탬프":
        positions = stampPositionsEng;
        break;
      case "주차장":
        positions = parkPositionsEng;
        break;
      case "카페/쉼터":
        positions = cafePositionEng;
        break;
      case "화장실":
        positions = toiletPositionsEng;
        break;
      default:
        break;
    }
  }

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center pt-6 pb-32 gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <MapBtn txt={t(`mapPage.m0`)} onClick={() => setMarkers("스탬프")} border={markers === "스탬프"} Icon={TbLineScan} bg={ThemeMode === "dark"} />
          <MapBtn txt={t(`mapPage.m1`)} onClick={() => setMarkers("카페/쉼터")} border={markers === "카페/쉼터"} Icon={MdForest} bg={ThemeMode === "dark"} />
          <MapBtn txt={t(`mapPage.m2`)} onClick={() => setMarkers("화장실")} border={markers === "화장실"} Icon={FaRestroom} bg={ThemeMode === "dark"} />
        </div>
        {/* 카카오지도 */}
        <KakaoMap userLocation={userLocation} iwContent={iwContent} markers={markers} />
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div className=" w-full px-8 flex items-center -mt-2">
            <img src={Mymarker} alt="마커" className="w-[20px] mr-2" />
            <p className="text-lg">내 위치</p>
          </div>
        )}
        <div className="flex flex-col w-full">
          {positions.map((p, idx) => {
            return (
              <div className="flex items-center mx-8 py-4 gap-x-5 border-b border-gray-400 border-dotted" key={idx}>
                <div className={`bgMarker bgMarker${idx}`}></div>
                <div>
                  <p className="text-xl mb-1 font-medium">{p.title}</p>
                  <p className="leading-5">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
