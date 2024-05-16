import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeProvider.js";
import infoMark from "../assets/qr-scan.png";
import { GrFormNext, GrClose } from "react-icons/gr";
import Weather from "../components/Weather.jsx";
import { PiPlantLight, PiTreeLight, PiFlowerTulipLight } from "react-icons/pi";

function GuideEle({ zIndex, txt, bg, close }) {
  return (
    <div className={`absolute grid font-semibold text-center w-full h-full text-white text-2xl leading-[36px] ${zIndex} ${bg} bg-cover bg-center bg-no-repeat`}>
      <div className="self-center justify-self-center">
        <p dangerouslySetInnerHTML={{ __html: txt }} />
        {close ? (
          <p className="flex items-center justify-end pt-5 px-2 font-normal text-[20px]">
            닫기&nbsp;
            <GrClose size="16px" />
          </p>
        ) : (
          <p className="flex items-center justify-end pt-5 px-6 font-normal text-[20px]">
            다음 <GrFormNext />
          </p>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [ThemeMode] = useTheme();
  let [showGuide, setShowGuide] = useState(false);
  let [guideNum, setGuideNum] = useState(1);
  const [guide, setGuide] = useState(<div></div>);
  const [guideZin, setGuideZin] = useState("z-10");

  const nextGuide = () => {
    if (guideNum === 1) {
      setGuide(<GuideEle zIndex="z-30" txt="QR 코드는 대구 수목원 곳곳에 있습니다. 카메라 렌즈를 QR코드에 가까이 대주세요." bg="bg-[url('./assets/guide2.svg')]" />);
      setGuideZin("z-30");
    } else if (guideNum === 2) {
      setGuide(<GuideEle zIndex="z-30" txt="qr 코드의 스캔이 완료되면 스탬프가 찍힙니다. 찍힌 스탬프는 스탬프 메뉴에서 확인할 수 있습니다." bg="bg-[url('./assets/guide3.svg')]" />);
    } else if (guideNum === 3) {
      setGuide(<GuideEle zIndex="z-30" txt="찍힌 스탬프의 갯수에 따라 다양한 경품을 받을 수 있습니다." bg="bg-[url('./assets/guide4.svg')]" close={true} />);
    } else if (guideNum === 4) {
      setGuideZin("z-10");
      setShowGuide(false);
      return;
    }
    setGuideNum(++guideNum);
  };
  return (
    <Layout>
      {showGuide && (
        <div onClick={nextGuide} className={`absolute h-[108vh] -top-[60px] w-screen ${guideZin}`}>
          {guide}
        </div>
      )}
      <div className="w-full h-full flex flex-col justify-center items-center pt-8 pb-10">
        <div
          className="w-[300px] h-[100px] relative flex items-center"
          onClick={() => {
            setGuide(
              <GuideEle
                txt="아래쪽의 QR 촬영 버튼을 누르면
              카메라가 켜집니다."
                bg="bg-black/70"
              />
            );
            setGuideNum(1);
            setShowGuide(true);
          }}
        >
          <div className="w-full h-full flex flex-col ml-4 justify-center">
            <span className="text-2xl">앱 이용 방법</span>
            <span>스탬프 찍고 경품 받아가세요!</span>
          </div>
          <img className="absolute right-0 top-[22px] w-[30%] -z-10" src={infoMark} alt="안내 이미지" />
        </div>
        <div className="w-[90%] max-w-[370px] flex flex-wrap items-center gap-y-3 mx-auto">
          <Link to="/introsumok" className="w-full h-[150px]">
            <div className="w-full h-full rounded-lg bg-[#119724] text-white flex justify-center items-center">
              <PiTreeLight className="text-8xl" />
              <div className="w-[50%] ml-3">
                <span className="text-2xl font-semibold">대구수목원 소개</span>
                <p>이용시간, 주의 사항 등</p>
              </div>
            </div>
          </Link>
          <Link to="/indoorinfo" className="w-[48%] mr-auto h-[150px]">
            <div className={`w-full h-full rounded-lg flex flex-col items-center justify-center ${ThemeMode === "dark" ? "bg-[#343434] text-[#b5b5b5]" : "bg-[#ddd] text-[#555]"}`}>
              <PiFlowerTulipLight className="text-7xl" />
              <span className="text-xl mt-1 font-semibold">산림문화전시관</span>
            </div>
          </Link>
          <Link to="/indoorinfo2" className="w-[48%] h-[150px]">
            <div className="w-full h-full rounded-lg bg-[#f1a636] text-white flex flex-col items-center justify-center">
              <PiPlantLight className="text-7xl" />
              <span className="text-xl mt-1 font-semibold">목재문화체험장</span>
            </div>
          </Link>
        </div>
        <div className="w-full max-w-[350px] mt-4">
          <Weather />
        </div>
      </div>
    </Layout>
  );
}
