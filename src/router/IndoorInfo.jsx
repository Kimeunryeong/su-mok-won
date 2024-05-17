import React from "react";
import Layout from "../components/Layout";
import "../style/indoorinfo.css";
import Title from "../components/Title";
import Hours from "../components/Hours";
import GreenDot from "../components/GreenDot";
import { useTranslation } from "react-i18next";

export default function IndoorInfo() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="indoor-section">
        <Title title={t(`indoor1.iI0`)} />
        <article>
          <div className="forestcul-text">{t(`indoor1.iI1`)}</div>
          {/* 위치 */}
          <GreenDot title={t(`indoor1.iI13`)} />
          지도
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
