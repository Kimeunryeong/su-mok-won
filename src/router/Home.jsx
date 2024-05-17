import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeProvider.js";
import Layout from "../components/Layout";
import Weather from "../components/Weather.jsx";
import infoMark from "../assets/qr-scan.png";
import stampSmall from "../assets/stampApprove.png";
import { GrFormNext, GrClose } from "react-icons/gr";
import { PiPlantLight, PiTreeLight, PiFlowerTulipLight, PiQuestionLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import i18n from "../context/i18n.js";
import flagusa from "../assets/flagUSA.png";
import flagko from "../assets/flagKor.png";
import { apiStampInfo } from "../api.js";

function GuideEle({ zIndex, txt, bg, close }) {
  const { t } = useTranslation();
  return (
    <div className={`absolute grid font-semibold text-center w-full h-full text-white text-2xl leading-[36px] ${zIndex} ${bg} bg-cover bg-center bg-no-repeat`}>
      <div className="self-center justify-self-center">
        <p dangerouslySetInnerHTML={{ __html: txt }} />
        {close ? (
          <p className="flex items-center justify-end pt-5 px-2 font-normal text-[20px]">
            {t(`main.guide4`)}&nbsp;
            <GrClose size="16px" />
          </p>
        ) : (
          <p className="flex items-center justify-end pt-5 px-6 font-normal text-[20px]">
            {t(`main.guide3`)} <GrFormNext />
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
  const nav = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [stampArray, setStampArray] = useState([]);

  useEffect(() => {
    if (userData) {
      const res = apiStampInfo(userData.token, userData.user_id);
      res.then((result) => {
        setStampArray(result.data);
      });
    }
  }, []);
  const guideNav = userData ? false : true;
  const { t } = useTranslation();

  const nextGuide = (guideNav) => {
    if (guideNum === 1) {
      setGuide(<GuideEle zIndex="z-30" txt={t(`main.guide1`)} bg="bg-[url('./assets/guide2.svg')]" />);
      setGuideZin("z-30");
    } else if (guideNum === 2) {
      setGuide(<GuideEle zIndex="z-30" txt={t(`main.guide2`)} bg="bg-[url('./assets/guide3.svg')]" close={true} />);
    } else if (guideNum === 3) {
      // setGuide(<GuideEle zIndex="z-30" txt="찍힌 스탬프의 갯수에 따라 다양한 경품을 받을 수 있습니다." bg="bg-[url('./assets/guide4.svg')]" close={true} />);
      if (guideNav) nav("/login");
      setGuideZin("z-10");
      setShowGuide(false);
      return;
    }
    setGuideNum(++guideNum);
  };
  return (
    <Layout>
      {showGuide && (
        <div onClick={() => nextGuide(guideNav)} className={`absolute h-[108vh] -top-[60px] w-screen ${guideZin}`}>
          {guide}
        </div>
      )}
      <div className="w-full h-full flex flex-col justify-center items-center pt-[76px] pb-10">
        {userData ? (
          <div
            className="absolute top-[65px] right-6 text-4xl"
            onClick={() => {
              setGuide(<GuideEle txt={t(`main.guide0`)} bg="bg-black/70" />);
              setGuideNum(1);
              setShowGuide(true);
            }}
          >
            <PiQuestionLight color="#777" />
          </div>
        ) : (
          <div
            className="absolute top-[70px] right-8 w-8"
            onClick={() => {
              if (i18n.language === "en") {
                i18n.changeLanguage("ko");
              } else if (i18n.language === "ko") {
                i18n.changeLanguage("en");
              }
            }}
          >
            {i18n.language === "en" ? <img src={flagko} alt="언어변경" /> : <img src={flagusa} alt="언어변경" />}
          </div>
        )}
        <div className="w-[300px] h-[100px] relative flex items-center">
          {!userData && (
            <>
              <div
                onClick={() => {
                  setGuide(<GuideEle txt={t(`main.guide0`)} bg="bg-black/70" />);
                  setGuideNum(1);
                  setShowGuide(true);
                }}
                className="w-full h-full flex flex-col ml-4 justify-center"
              >
                <span className="text-2xl">{t(`main.hello0`)}</span>
                <span>{t(`main.hello1`)}</span>
              </div>
              <img className="absolute right-0 top-[22px] w-[30%] -z-10" src={infoMark} alt="안내 이미지" />
            </>
          )}
          {userData && (
            <div className="w-full h-full pt-4">
              <div className="text-2xl mb-[2px]">
                {userData.user_id} {t(`main.hello2`)}
              </div>
              <span className="text-lg text-[#888]">
                {t(`main.hello3`)} {stampArray.filter((s) => s.is_collected === 1).length} {t(`main.hello4`)}
              </span>
              <img className="absolute right-0 top-2 w-[28%] -z-10" src={stampSmall} alt="안내 이미지" />
            </div>
          )}
        </div>
        <div className="w-[90%] max-w-[370px] flex flex-wrap items-center gap-y-3 mx-auto">
          <Link to="/introsumok" className="w-full h-[150px]">
            <div className="w-full h-full rounded-lg bg-[#119724] text-white flex justify-center items-center">
              <PiTreeLight className="text-8xl" />
              <div className="w-[50%] ml-3">
                <span className="text-2xl font-semibold">{t(`main.menu0`)}</span>
                <p>{t(`main.menu1`)}</p>
              </div>
            </div>
          </Link>
          <Link to="/indoorinfo" className="w-[48%] mr-auto h-[150px]">
            <div className={`w-full h-full rounded-lg flex flex-col items-center justify-center ${ThemeMode === "dark" ? "bg-[#343434] text-[#b5b5b5]" : "bg-[#ddd] text-[#555]"}`}>
              <PiFlowerTulipLight className="text-7xl" />
              <span className="text-xl mt-1 font-semibold">{t(`main.menu2`)}</span>
            </div>
          </Link>
          <Link to="/indoorinfo2" className="w-[48%] h-[150px]">
            <div className="w-full h-full rounded-lg bg-[#f1a636] text-white flex flex-col items-center justify-center">
              <PiPlantLight className="text-7xl" />
              <span className="text-xl mt-1 font-semibold">{t(`main.menu3`)}</span>
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
