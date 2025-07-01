import { useState, useEffect } from "react";

function WeatherCard({ temperature, weather, weatherOptions }) {
  const [currentBanner, setCurrentBanner] = useState("");

  // pass it weather.icon[2] & weather.id
  function setWeatherBanner(currentTime, currentWeather) {
    let locationTime = "";
    if (currentTime === "d") {
      locationTime = true;
    } else {
      locationTime = false;
    }

    let locationWeather = "";
    if (currentWeather >= 801) {
      locationWeather = "cloudy";
    } else if (currentWeather === 800) {
      locationWeather = "clear";
    } else if (currentWeather >= 700) {
      locationWeather = "fog";
    } else if (currentWeather >= 600) {
      locationWeather = "snow";
    } else if (currentWeather >= 300) {
      locationWeather = "rain";
    } else {
      locationWeather = "storm";
    }

    let selectedBanner = weatherOptions.find((item) => {
      return item.day === locationTime && item.condition === locationWeather;
    });

    setCurrentBanner(selectedBanner.url);
  }

  // setWeatherBanner is the function, setCurrentBanner is the setState
  useEffect(() => {
    setWeatherBanner(weather.icon[2], weather.id);
  }, []);

  return (
    // takes its url from 'currentBanner' state
    <div
      className="weatherCard"
      style={{ backgroundImage: `url('${currentBanner}')` }}
    >
      <p className="weatherCard__temperature">{`${temperature}°F`}</p>
    </div>
  );
}

export default WeatherCard;
