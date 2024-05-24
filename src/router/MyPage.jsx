import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ColorBlindContext, useTheme } from "../context/themeProvider.js";
import "../style/mypage.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiPasswordEdit } from "../api.js";
import { useTranslation } from "react-i18next";
import i18n from "../context/i18n.js";
import { PiCloudSunFill, PiGithubLogoFill, PiImageFill, PiInfoFill, PiPlantFill } from "react-icons/pi";

function SettingBtn({ txt1, txt2, onClick, ThemeMode, left, onOff }) {
  return (
    <div className={`settingBtn ${ThemeMode === "dark" ? "DarkSettingBtn" : ""}`} onClick={onClick}>
      <div className="btnTxt">
        <p>{txt1}</p>
        <p dangerouslySetInnerHTML={{ __html: txt2 }}></p>
      </div>
      <div className={`togBtn ${ThemeMode === "dark" ? "darkBtn" : ""} ${onOff ? "onBtn" : ""}`}>
        <div className={`togCircle ${ThemeMode === "dark" ? "darkTogCircle" : ""}`} style={{ left: left ? "22px" : "0" }}></div>
      </div>
    </div>
  );
}

export default function MyPage() {
  const { t } = useTranslation();
  let token = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const [ThemeMode, toggleTheme] = useTheme();
  const { isBlind, setIsBlind } = useContext(ColorBlindContext);
  const [user, setUser] = useState(null);
  const [showCredit, setShowCredit] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("userData")));
  }, [navigate]);

  const onClick = () => {
    sessionStorage.removeItem("userData");
    Swal.fire({
      text: "로그아웃이 완료되었습니다.",
      padding: "20px 0",
      width: "350px",
      confirmButtonText: "확인",
      buttonsStyling: false,
    });
    navigate("/home");
  };

  const { mutate } = useMutation(apiPasswordEdit, {
    onSuccess: (data) => {
      if (data.result === true) {
        Swal.fire({
          text: data.message,
          padding: "20px 0",
          width: "350px",
          confirmButtonText: "확인",
          buttonsStyling: false,
        });
      }
    },
    onSettled: (data) => {
      if (data.result === false) {
        Swal.fire({
          text: data.message,
          padding: "20px 0",
          width: "350px",
          confirmButtonText: "확인",
          buttonsStyling: false,
        });
      }
    },
  });
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    const postUserID = token.user_id;
    const modifiedData = {
      ...data,
      user_id: postUserID,
    };
    mutate(modifiedData);
  };

  return (
    <Layout>
      <section id="myPage">
        <article id="myAccount">
          {/* 사용자 정보를 이용하여 마이페이지 렌더링 */}
          {user ? (
            <>
              <h2>{user?.user_id + t(`myPage.mp0`)}</h2>
              <div id="myPW">{t(`myPage.mp1`)}</div>
              <form id="accountInfo" onSubmit={handleSubmit(onValid)} className="flex items-end">
                <input {...register("passwordEdit")} type="password" placeholder="******" className={`${ThemeMode === "dark" ? "bg-[#111]" : "bg-inherit"}`} />
                <button className={`editBtn ${ThemeMode === "dark" ? "darkEditBtn" : ""}`}>{t(`myPage.mp2`)}</button>
              </form>
            </>
          ) : (
            <>
              <h2 id="notLoginTit">회원 가입하고 다양한 경품 받아가세요!</h2>
              <button>
                <Link to="/signup">1분만에 가입하기</Link>
              </button>
            </>
          )}
        </article>
        <SettingBtn txt1={t(`myPage.mp3`)} txt2={t(`myPage.mp4`)} onClick={() => toggleTheme()} ThemeMode={ThemeMode} left={ThemeMode === "dark"} onOff={ThemeMode === "dark"} />
        <SettingBtn txt1={t(`myPage.mp5`)} txt2={t(`myPage.mp6`)} onClick={() => setIsBlind(!isBlind)} ThemeMode={ThemeMode} left={isBlind} onOff={isBlind} />
        <SettingBtn
          txt1={t(`myPage.mp7`)}
          txt2={t(`myPage.mp8`)}
          onClick={() => {
            if (i18n.language === "en") {
              i18n.changeLanguage("ko");
            } else if (i18n.language === "ko") {
              i18n.changeLanguage("en");
            }
          }}
          ThemeMode={ThemeMode}
          left={i18n.language === "en"}
          onOff={i18n.language === "en"}
        />
        {user && (
          <p id="logout" onClick={onClick}>
            {t(`myPage.mp9`)}
          </p>
        )}
        <div id="credit" onClick={() => setShowCredit(!showCredit)}>
          크레딧
        </div>
        {showCredit && (
          <div id="creditTxt">
            <span>※ 실습용으로 제작된 사이트(앱)이며, 실제로 사용할 수 없습니다.</span>
            <ul>
              <li>
                <Link to="https://github.com/Kimeunryeong/su-mok-won" target="_blank" rel="noreferrer noopener">
                  <PiGithubLogoFill size="30px" color="#666" />
                  깃허브
                </Link>
              </li>
              <li>
                <Link to="https://www.freepik.com/free-vector/flat-design-cruelty-free-badge-collection_11906105.htm#fromView=search&page=11&position=5&uuid=5cb17115-3db8-4301-83c9-6884f042141b" target="_blank" rel="noreferrer noopener">
                  <PiPlantFill size="30px" color="#666" />
                  로고 아이콘
                </Link>
              </li>
              <li>
                <Link to="https://www.flaticon.com/free-icon/qr-scan_4187294?related_id=4187264&origin=search" target="_blank" rel="noreferrer noopener">
                  <PiImageFill size="30px" color="#666" />홈 아이콘1
                </Link>
              </li>
              <li>
                <Link to="https://www.flaticon.com/free-icon/stamp_5442020?term=stamp&page=1&position=12&origin=search&related_id=5442020" target="_blank" rel="noreferrer noopener">
                  <PiImageFill size="30px" color="#666" />홈 아이콘2
                </Link>
              </li>
              <li>
                <Link to="https://www.freepik.com/free-vector/weather-icons-collection_972339.htm" target="_blank" rel="noreferrer noopener">
                  <PiCloudSunFill size="30px" color="#666" />
                  날씨 아이콘
                </Link>
              </li>
              <li>
                <Link to="https://phosphoricons.com/" target="_blank" rel="noreferrer noopener">
                  <PiInfoFill size="30px" color="#666" />
                  기타 아이콘
                </Link>
              </li>
            </ul>
          </div>
        )}
      </section>
    </Layout>
  );
}
