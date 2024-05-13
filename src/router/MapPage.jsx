import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import KakaoMap from "../components/KakaoMap";

function MapBtn({ onClick, txt }) {
  return (
    <button className="w-[100px] h-[50px] text-center bg-[#119724] cursor-pointer text-white font-semibold shadow-sm" onClick={onClick}>
      {txt}
    </button>
  );
}

export default function MapPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [iwContent, setIwContent] = useState("");

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
    if (userLocation) {
      // KakaoMap 컴포넌트에 사용자의 위치 전달
    }
  }, [userLocation]);

  // 각 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (latitude, longitude, locationName) => {
    setUserLocation({ latitude, longitude });
    setIwContent(`<div style="padding: 10px;">${locationName}</div>`); // 클릭된 버튼의 위치를 사용자의 위치로 설정
  };

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center py-10 gap-4">
        {/* 카카오지도 */}
        <KakaoMap userLocation={userLocation} iwContent={iwContent} />
        {errorMessage && <p>{errorMessage}</p>}
        {/* 버튼 */}
        <div className="w-full flex flex-wrap gap-6 justify-center py-4">
          <MapBtn onClick={() => handleButtonClick(35.80119999998254, 128.52099220293818, "활엽수림")} txt="1. 활엽수림" />
          <MapBtn onClick={() => handleButtonClick(35.80052370351272, 128.5201012191372, "습지원")} txt="2. 습지원" />
          <MapBtn onClick={() => handleButtonClick(35.799712542069514, 128.52292532334738, "무궁화원")} txt="3. 무궁화원" />
          <MapBtn onClick={() => handleButtonClick(35.797142822107794, 128.5259099978123, "염료 식물원")} txt="4. 염료 식물원" />
          <MapBtn onClick={() => handleButtonClick(35.795706624856, 128.52537693278592, "양치 식물원")} txt="5. 양치 식물원" />
          <MapBtn onClick={() => handleButtonClick(35.79479437605564, 128.52571073583277, "전통정원")} txt="6. 전통 정원" />
          <MapBtn
            onClick={() => {
              getCurrentLocation();
              setIwContent(`<div style="padding: 10px;">내 위치</div>`);
            }}
            txt="내 위치"
          />
        </div>
      </div>
    </Layout>
  );
}
