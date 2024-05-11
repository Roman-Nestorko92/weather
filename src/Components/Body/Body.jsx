import React, { useEffect, useState } from "react";
import { apiKey } from "../api/getWeather";
import axios from "axios";
import "./body.css";

export default function Body() {
  const [weatherData, setWeatherData] = useState({});
  const [onChange, setOnChange] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherCurrentPosition, setWeatherCurrentPosition] = useState(null);

  useEffect(() => {
    const getWeatherPosition = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiUrl = `https://weather-back-82hq.onrender.com/weather?lat=${latitude}&lon=${longitude}`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            setWeatherData(data);
            const city = data.name;
            const country = data.sys.country;
            const location = `${city}, ${country}`;
            setWeatherCurrentPosition(location);
          });
        }
      } catch (error) {
        console.error("Помилка отримання погоди:", error);
      }
    };

    getWeatherPosition();
  }, []);

  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onSearchButton = () => {
    fetch(
      `${apiKey.base}weather?q=${onChange}&units=metric&APPID=${apiKey.key}`
    )
      .then((res) => res.json())
      .then((results) => {
        setWeatherData(results);
      });
    setOnChange("");
  };

  return (
    <>
      <div>
        <ul className="allBody">
          <ul className="dayTime">
            <li>
              <h3 className="daytime">
                Day
                <span className="timeWord"> :</span>{" "}
                {new Date().toLocaleDateString()}{" "}
              </h3>
            </li>
            <li>
              <h3 className="daytime">
                Time
                <span className="timeWord"> :</span>{" "}
                {currentTime.toLocaleTimeString()}{" "}
              </h3>
            </li>
          </ul>
          {weatherCurrentPosition ? (
            <p>My position: {weatherCurrentPosition} </p>
          ) : (
            <p>Отримання погодних даних...</p>
          )}

          <li>
            <input
              className="inputSearch"
              type="text"
              placeholder="search city"
              value={onChange}
              onChange={(e) => setOnChange(e.target.value)}
            />{" "}
            <button
              className="buttonSearch"
              onClick={onSearchButton}
            >
              search
            </button>
          </li>
          {typeof weatherData.main !== "undefined" ? (
            <ul>
              <li>
                <h2 className="townData"> {weatherData.name}</h2>
              </li>
              <li>
                <h2 className="temperatureData"> {weatherData.main.temp} °C</h2>
              </li>
              <li className="weatheData">{weatherData.weather[0].main}</li>
              <li className="descriptionData">
                [{weatherData.weather[0].description}]
              </li>
            </ul>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}
