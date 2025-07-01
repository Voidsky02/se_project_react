import { useState, useEffect } from "react";

function WeatherCard({ temperature, weather, weatherOptions }) {
  const [currentBanner, setCurrentBanner] = useState("");

  const weatherBanners = {
    day: {
      clear: "src/images/day-clear.svg",
      cloudy: "src/images/day-cloudy.svg",
      rain: "src/images/day-rain.svg",
      storm: "src/images/day-storm.svg",
      snow: "src/images/day-snow.svg",
      fog: "src/images/day-fog.svg",
    },
    night: {
      clear: "src/images/night-clear.svg",
      cloudy: "src/images/night-cloudy.svg",
      rain: "src/images/night-rain.svg",
      storm: "src/images/night-storm.svg",
      snow: "src/images/night-snow.svg",
      fog: "src/images/night-fog.svg",
    },
  };

  // pass it weather.icon[2] & weather.id
  function setWeatherBanner(currentTime, currentWeather) {
    // will rewrite this code using .find() to find correct banner out of array
    //
    let locationTime = "";
    if (currentTime === "d") {
      locationTime = "day";
    } else {
      locationTime = "night";
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

    setCurrentBanner(weatherBanners[locationTime][locationWeather]);
  }

  // setWeatherBanner is the function, setCurrentBanner is the setState
  useEffect(() => {
    setWeatherBanner(weather.icon[2], weather.id);
    console.log(weather);
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
