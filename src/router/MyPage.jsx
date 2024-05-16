import React, { useState } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../context/themeProvider.js";
import "../style/mypage.css";
import IsLogin from "../components/IsLogin.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiPasswordEdit } from "../api.js";

function SettingBtn({ txt1, txt2, onClick, ThemeMode, left, left1 }) {
  return (
    <div className={`settingBtn ${ThemeMode === "dark" ? "DarkSettingBtn" : ""}`} onClick={onClick}>
      <div className="btnTxt">
        <p>{txt1}</p>
        <p dangerouslySetInnerHTML={{ __html: txt2 }}></p>
      </div>
      <div className={`togBtn ${ThemeMode === "dark" ? "darkBtn" : ""}`}>
        <div className={`togCircle ${ThemeMode === "dark" ? "darkTogCircle" : ""}`} style={{ left: left === left1 ? "22px" : "0" }}></div>
      </div>
    </div>
  );
}

export default function MyPage() {
  const token = JSON.parse(sessionStorage.getItem("userData"));

  const navigate = useNavigate();
  // 색맹모드 구현시 삭제
  const [btn2, setBtn2] = useState(false);
  // 외국어모드 구현시 삭제
  const [btn3, setBtn3] = useState(false);
  const [ThemeMode, toggleTheme] = useTheme();

  const [user, setUser] = useState(null); // 사용자 정보를 상태로 관리
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
  // IsLogin 컴포넌트에서 전달한 사용자 정보를 받아 상태를 업데이트하는 함수
  const updateUser = (userData) => {
    setUser(userData);
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
          {/* IsLogin 컴포넌트에 updateUser 함수를 props로 전달하여 사용자 정보 업데이트 */}
          <IsLogin updateUser={updateUser} />
          {/* 사용자 정보를 이용하여 마이페이지 렌더링 */}
          {user && (
            <>
              <h2>{user?.user_id}님의 마이페이지</h2>
              <div id="myPW">비밀번호</div>
              <form id="accountInfo" onSubmit={handleSubmit(onValid)} className="flex items-end">
                <input {...register("passwordEdit")} type="password" placeholder="******" className={`${ThemeMode === "dark" ? "bg-[#111]" : "bg-inherit"}`} />
                <button className={`editBtn ${ThemeMode === "dark" ? "darkEditBtn" : ""}`}>수정</button>
              </form>
            </>
          )}
        </article>
        <SettingBtn txt1="다크 모드" txt2="앱 화면을 어둡게 변경합니다." onClick={() => toggleTheme()} ThemeMode={ThemeMode} left={ThemeMode} left1="dark" />
        <SettingBtn txt1="색맹 모드" txt2="색깔을 구분하기 힘든 분들을 위해 찍힌 스탬프의 모양을 변경합니다." onClick={() => setBtn2(!btn2)} ThemeMode={ThemeMode} left={btn2} left1={true} />
        <SettingBtn txt1="Change Language" txt2="언어를 영어로 변경합니다.<br /> App language will change to English." onClick={() => setBtn3(!btn3)} ThemeMode={ThemeMode} left={btn3} left1={true} />
        <p id="logout" onClick={onClick}>
          로그아웃
        </p>
      </section>
    </Layout>
  );
}
