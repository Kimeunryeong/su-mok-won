import React, { useState } from "react";
import { useTheme } from "../context/themeProvider";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

export function IdInput({ register, errors }) {
  const [ThemeMode] = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col mb-6">
      <input {...register("user_id")} className={`w-[300px] h-[50px] rounded-lg border-none ring-1 ${ThemeMode === "dark" ? "ring-white bg-[#121212]" : "ring-gray-300 bg-inherit"} outline-none focus:ring-2 focus:ring-[#119724] ${errors.hasOwnProperty("user_id") && "ring-red-500"}`} type="text" placeholder={t(`signUp.s2`)} />
      {errors.hasOwnProperty("user_id") && <span className="text-red-500 text-sm mt-1 ml-1">{errors?.user_id?.message}</span>}
    </div>
  );
}

export function PwInput({ register, errors, name }) {
  const [ThemeMode] = useTheme();
  const [type, setType] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col mb-6">
      <div className="relative">
        <input {...register(name)} className={`w-[300px] h-[50px] rounded-lg border-none ring-1 ${ThemeMode === "dark" ? "ring-white bg-[#121212]" : "ring-gray-300 bg-inherit"} outline-none focus:ring-2 focus:ring-[#119724] ${errors.hasOwnProperty(name) && "ring-red-500"}`} type={type ? "password" : "text"} placeholder={t(`signUp.s3`)} />
        <div onClick={() => setType(!type)} className={`absolute top-[2px] right-[5px] px-3 py-[6px] ${ThemeMode === "dark" ? "bg-[#121212]" : "bg-white"}`}>
          {type ? <PiEyeLight size="35px" color="#aaa" /> : <PiEyeSlashLight size="35px" color="#aaa" />}
        </div>
      </div>
      {errors.hasOwnProperty(name) && <span className="text-red-500 text-sm mt-1 ml-1">{errors?.user_pw?.message}</span>}
    </div>
  );
}

export function Pw2Input({ register }) {
  const [ThemeMode] = useTheme();
  const [type2, setType2] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="relative">
      <input {...register("password2")} name="password2" className={`w-[300px] h-[50px] rounded-lg border-none ring-1 ${ThemeMode === "dark" ? "ring-white bg-[#121212]" : "ring-gray-300 bg-inherit"} outline-none focus:ring-2 focus:ring-[#119724]`} type={type2 ? "password" : "text"} placeholder={t(`signUp.s4`)} />
      <div onClick={() => setType2(!type2)} className={`absolute top-[2px] right-[5px] px-3 py-[6px] ${ThemeMode === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        {type2 ? <PiEyeLight size="35px" color="#aaa" /> : <PiEyeSlashLight size="35px" color="#aaa" />}
      </div>
    </div>
  );
}
