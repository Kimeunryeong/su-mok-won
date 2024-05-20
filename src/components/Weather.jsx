import React, { useState, useEffect } from "react";
import clouds1 from "../assets/weatherIcon/clouds1.svg";
import clouds2 from "../assets/weatherIcon/clouds2.svg";
import mist from "../assets/weatherIcon/mist.svg";
import rain from "../assets/weatherIcon/rain.svg";
import snow from "../assets/weatherIcon/snow.svg";
import sun from "../assets/weatherIcon/sun.svg";
import thunder from "../assets/weatherIcon/thunder.svg";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const { t } = useTranslation();

  const apiKey = "6a0d33958b14a3c26fa985a6fecc4763";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.799208845005865&lon=128.52369024972057&appid=${apiKey}`;

  useEffect(() => {
    axios
      .get(url)
      .then((responseData) => {
        const data = responseData.data;
        const tempCelsius = (data.main.temp - 273.15).toFixed(0);
        setWeatherData({
          weather: data.weather[0].description,
          temp: isNaN(tempCelsius) ? null : Number(tempCelsius),
        });
      })
      .catch((error) => console.log(error));
  }, [url]);
  let weatherIcon = sun;
  switch (weatherData?.weather) {
    case "few clouds":
      weatherIcon = clouds1;
      break;
    case "scattered clouds":
      weatherIcon = clouds2;
      break;
    case "broken clouds":
      weatherIcon = clouds2;
      break;
    case "shower rain":
      weatherIcon = rain;
      break;
    case "rain":
      weatherIcon = rain;
      break;
    case "thunderstorm":
      weatherIcon = thunder;
      break;
    case "snow":
      weatherIcon = snow;
      break;
    case "mist":
      weatherIcon = mist;
      break;
    default:
      break;
  }
  return (
    <>
      {weatherData ? (
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-center text-lg">
          <p>{t(`main.weather0`)}</p>
          <img className="weatherIconImg w-7" src={weatherIcon} alt="날씨" />
          <p>{weatherData.temp}℃</p>
        </div>
      ) : (
        <p className="text-lg text-center">{t(`main.weather1`)}</p>
      )}
    </>
  );
}
