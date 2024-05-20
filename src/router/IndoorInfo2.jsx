import React, { useEffect } from "react";
import Layout from "../components/Layout";
import "../style/indoorinfo.css";
import Title from "../components/Title";
import Hours from "../components/Hours";
import GreenDot from "../components/GreenDot";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { kakao } = window;

export default function IndoorInfo2() {
  const { t } = useTranslation();
  useEffect(() => {
    // 이미지 지도에서 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(35.8, 128.5199);

    var mapWrap = document.getElementById("indoorMap2"),
      mapOpt = {
        center: new kakao.maps.LatLng(35.8, 128.5215), // 지도 중심
        level: 4, // 확대 레벨
      };

    // 이미지 지도를 생성합니다
    var map = new kakao.maps.Map(mapWrap, mapOpt);

    // 마커
    var imageSrc = "markers/oneMarker.svg",
      imageSize = new kakao.maps.Size(24, 35),
      img = new kakao.maps.MarkerImage(imageSrc, imageSize);

    new kakao.maps.Marker({
      map: map,
      position: markerPosition,
      image: img,
    });
  }, []);
  return (
    <Layout>
      <div className="indoor-section">
        <Title title={t(`indoor2.iI0`)} />
        <article>
          <div className="forestcul-text">{t(`indoor2.iI1`)}</div>
          {/* 위치 */}
          <GreenDot title={t(`indoor1.iI13`)} />
          <div id="indoorMap2" className="indoorMap"></div>
          {/* 이용시간 */}
          <div className="intro-time">
            <GreenDot title={t(`indoor2.iI2`)} />
            <Hours date1={t(`indoor2.iI3`)} time1={t(`indoor2.iI4`)} date2={t(`indoor2.iI5`)} time2={t(`indoor2.iI6`)} />
            <div className="timetable-caution">※ {t(`indoor2.iI7`)}</div>
          </div>
          {/* 이용안내 */}
          <div className="useProgInfo">
            <GreenDot title={t(`indoor2.iI8`)} />
            <div className="progInnerInfo">
              <p className="progTit">{t(`indoor2.iI9`)}</p>
              <p className="mb-6">
                - <Link to="https://yeyak.daegu.go.kr/yeyak/experience/experienceListView.do?memId=B0000005">{t(`indoor2.iI10`)}</Link>
                {t(`indoor2.iI11`)}
              </p>
              <p className="progTit">{t(`indoor2.iI12`)}</p>
              <p>- {t(`indoor2.iI13`)}</p>
              <p>- {t(`indoor2.iI14`)}</p>
              <p>※ {t(`indoor2.iI15`)}</p>
              <p>※ {t(`indoor2.iI16`)}</p>
            </div>
          </div>
          {/* 층별안내 */}
          <div className="floorInfo">
            <GreenDot title={t(`indoor2.iI17`)} />
            <div>
              <div className="floorInfo-con-box">
                <div>
                  {t(`indoor2.iI18`)} <p>{t(`indoor2.iI19`)}</p>
                </div>
                <div className="floorImg">
                  <div></div>
                </div>
              </div>
              <div className="floorInfo-con-box">
                <div>
                  {t(`indoor2.iI20`)}
                  <p>{t(`indoor2.iI21`)}</p>
                </div>
                <div className="floorImg">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
