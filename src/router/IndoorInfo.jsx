import React, { useEffect } from "react";
import Layout from "../components/Layout";
import "../style/indoorinfo.css";
import Title from "../components/Title";
import Hours from "../components/Hours";
import GreenDot from "../components/GreenDot";
import { useTranslation } from "react-i18next";
const { kakao } = window;

export default function IndoorInfo() {
  const { t } = useTranslation();
  useEffect(() => {
    // 이미지 지도에서 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(35.7993, 128.5226);

    var mapWrap = document.getElementById("indoorMap"),
      mapOpt = {
        center: new kakao.maps.LatLng(35.7993, 128.5226), // 지도 중심
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
        <Title title={t(`indoor1.iI0`)} />
        <article>
          <div className="forestcul-text">{t(`indoor1.iI1`)}</div>
          {/* 위치 */}
          <GreenDot title={t(`indoor1.iI13`)} />
          <div id="indoorMap" className="indoorMap"></div>
          {/* 이용시간 */}
          <div className="intro-time">
            <GreenDot title={t(`indoor1.iI2`)} />
            <Hours date1={t(`indoor1.iI3`)} time1={t(`indoor1.iI4`)} date2={t(`indoor1.iI5`)} time2={t(`indoor1.iI6`)} />
            <div className="timetable-caution">※ {t(`indoor1.iI7`)}</div>
          </div>
          {/* 층별안내 */}
          <div className="floorInfo">
            <GreenDot title={t(`indoor1.iI8`)} />
            <div>
              <div className="floorInfo-con-box">
                <div>
                  {t(`indoor1.iI9`)} <p>{t(`indoor1.iI10`)}</p>
                </div>
                <div className="floorImg">
                  <div></div>
                </div>
              </div>
              <div className="floorInfo-con-box">
                <div>
                  {t(`indoor1.iI11`)}
                  <p>{t(`indoor1.iI12`)}</p>
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
