import GreenDot from "../components/GreenDot";
import Hours from "../components/Hours";
import Layout from "../components/Layout";
import Title from "../components/Title";
import "../style/introsumok.css";
import { PiTentLight, PiKnifeLight, PiMegaphoneLight, PiBicycleLight, PiDogLight, PiShovelLight } from "react-icons/pi";
import { useTheme } from "../context/themeProvider.js";
import { useTranslation } from "react-i18next";

export default function IntroSumok() {
  const [ThemeMode] = useTheme();
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="intro-section">
        {/* 타이틀 */}
        <Title title={t(`introSumok.iS0`)} />
        {/* 컨텐츠 */}
        {/* 이용시간 */}
        <div className="intro-time">
          <GreenDot title={t(`introSumok.iS1`)} />
          <Hours date1={t(`introSumok.iS2`)} time1={t(`introSumok.iS3`)} date2={t(`introSumok.iS4`)} time2={t(`introSumok.iS5`)} date3={t(`introSumok.iS6`)} time3={t(`introSumok.iS7`)} />
          <div className="timetable-caution">
            <p>※ {t(`introSumok.iS8`)}</p>
            <p>※ {t(`introSumok.iS9`)}</p>
            <p>※ {t(`introSumok.iS10`)}</p>
          </div>
        </div>
        {/* 주의사항 */}
        <div className="caution">
          <GreenDot title={t(`introSumok.iS11`)} />
          <div className="caution-box">
            <div style={{ background: ThemeMode === "dark" ? "#292929" : "" }}>
              <PiTentLight />
              <p>{t(`introSumok.iS12`)}</p>
            </div>
            <div style={{ background: ThemeMode === "dark" ? "#292929" : "" }}>
              <PiBicycleLight />
              <p>{t(`introSumok.iS13`)}</p>
            </div>
            <div style={{ background: ThemeMode === "dark" ? "#292929" : "" }}>
              <PiShovelLight />
              <p>{t(`introSumok.iS14`)}</p>
            </div>
            <div style={{ background: ThemeMode === "dark" ? "#292929" : "" }}>
              <PiMegaphoneLight />
              <p>{t(`introSumok.iS15`)}</p>
            </div>
            <div style={{ background: ThemeMode === "dark" ? "#292929" : "" }}>
              <PiDogLight />
              <p>{t(`introSumok.iS16`)}</p>
            </div>
            <div style={{ background: ThemeMode === "dark" ? "#292929" : "" }}>
              <PiKnifeLight />
              <p>{t(`introSumok.iS16`)}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
