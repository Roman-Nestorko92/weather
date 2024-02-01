import React, { useEffect, useState } from "react";
import { apiKey } from "../api/getWeather";
import "./body.css";

export default function Body() {
  const [weatherData, setWeatherData] = useState({});
  const [onChange, setOnChange] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

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
      <ul className="allBody">
        <ul className="dayTime">
          <li>
            <h3 className="daytime">Day: {new Date().toLocaleDateString()} </h3>
          </li>
          <li>
            <h3 className="daytime">
              Time: {currentTime.toLocaleTimeString()}{" "}
            </h3>
          </li>
        </ul>
        <li>
          <input
            type="text"
            placeholder="search city"
            value={onChange}
            onChange={(e) => setOnChange(e.target.value)}
          />{" "}
          <button onClick={onSearchButton}>search</button>
        </li>
        {typeof weatherData.main !== "undefined" ? (
          <ul>
            <li>
              <h2> {weatherData.name}</h2>
            </li>
            <li>
              <h2> {weatherData.main.temp} °C</h2>
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
    </>
  );
}
