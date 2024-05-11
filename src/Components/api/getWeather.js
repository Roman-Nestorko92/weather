export const apiKey = {
  key: "0fa7e74ab1c99e6afa08b93fc9a6e60b",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function getWeather(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;

      updateWeatherUI(weatherDescription, temperature);
    })
    .catch((error) => console.error("помилка", error));
}

function updateWeatherUI(description, temperature) {
  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const temperatureElement = document.getElementById("temperature");

  weatherDescriptionElement.textContent = description;
  temperatureElement.textContent = `${temperature} °C`;
}
