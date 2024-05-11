import getWeather from "./getWeather";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(ShowWeather, handleError);
} else {
  console.log("no location");
}

export default function ShowWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function handleError(error) {
  console.error("Помилка отримання геолокації:", error.message);
}
