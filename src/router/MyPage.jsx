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
      </section>
    </Layout>
  );
}
