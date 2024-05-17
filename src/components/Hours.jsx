import React from "react";
import { useTranslation } from "react-i18next";

export default function Hours({ date1, date2, date3, time1, time2, time3 }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="intro-timetable">
        <div className="timetable-title">
          {/* 기간(title)을 사용하지 않도록 조건부 렌더링 */}
          {date1 && time1 && <p>{t(`etc.h1`)}</p>}
          <p>{t(`etc.h2`)}</p>
        </div>
        <div className="timetable-column">
          {/* date1, time1이 존재할 때만 렌더링 */}
          {date1 && <p>{date1}</p>}
          <p>{time1}</p>
        </div>
        {date2 && time2 && (
          <div className="timetable-column">
            <p>{date2}</p>
            <p>{time2}</p>
          </div>
        )}
        {date3 && time3 && (
          <div className="timetable-column">
            <p>{date3}</p>
            <p>{time3}</p>
          </div>
        )}
      </div>
    </>
  );
}
