import React from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { apiPostUserLogin } from "../api";
import { IdInput, PwInput } from "../components/FromInput";
import Socials from "../components/Socials";

export default function Login() {
  const kakaoUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    response_type: "code",
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${kakaoUrl}?${params}`;

  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=email profile`;
  const navigate = useNavigate();
  const { mutate } = useMutation(apiPostUserLogin, {
    onSuccess: (data) => {
      if (data.result === true) {
        sessionStorage.setItem("userData", JSON.stringify(data));
        navigate("/home");
      }
    },
    onSettled: (data) => {
      if (data.result !== true || data.result2 !== true) {
        if (data.result2 === false) {
          setError(`user_id`, {
            message: data.message,
          });
        }
        if (data.result === false) {
          setError(`user_pw`, {
            message: data.message,
          });
        }
      }
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onValid = (data) => mutate(data);
  return (
    <Layout>
      <div className="w-full flex flex-col items-center py-16">
        <span className="text-3xl font-semibold mb-7">로그인</span>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col mb-2">
          <IdInput register={register} errors={errors} />
          <PwInput register={register} errors={errors} name="user_pw" />
          <button className="w-[300px] h-[50px] bg-[#119724] rounded-lg flex justify-center items-center text-xl text-white cursor-pointer">
            로그인
          </button>
        </form>
        <Socials
          txt1="카카오 로그인"
          txt2="구글 로그인"
          finalUrl={finalUrl}
          googleUrl={googleUrl}
        />
        <Link to="/signup">아직 계정이 없다면 회원가입</Link>
      </div>
    </Layout>
  );
}
