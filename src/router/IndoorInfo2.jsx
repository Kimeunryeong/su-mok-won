import React from "react";
import Layout from "../components/Layout";
import "../style/indoorinfo.css";
import Title from "../components/Title";
import Hours from "../components/Hours";
import GreenDot from "../components/GreenDot";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function IndoorInfo2() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="indoor-section">
        <Title title={t(`indoor2.iI0`)} />
        <article>
          <div className="forestcul-text">{t(`indoor2.iI1`)}</div>
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
