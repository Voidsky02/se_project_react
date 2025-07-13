import React, { useState, useEffect } from "react";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ temperature, weather, weatherOptions }) {
  const tempUnitContext = React.useContext(TemperatureUnitContext);

  const [currentBanner, setCurrentBanner] = useState("");

  // pass it weather.icon[2] & weather.id
  function updateWeatherBanner(currentTime, currentWeather) {
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

  // updateWeatherBanner is the function, setCurrentBanner is the setState
  useEffect(() => {
    updateWeatherBanner(weather.icon[2], weather.id);
  }, []);

  return (
    // takes its url from 'currentBanner' state
    <div
      className="weatherCard"
      style={{ backgroundImage: `url('${currentBanner}')` }}
    >
      <p className="weatherCard__temperature">{`${
        temperature[tempUnitContext.currentTemperatureUnit]
      }°${tempUnitContext.currentTemperatureUnit}`}</p>
    </div>
  );
}

export default WeatherCard;
