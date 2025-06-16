import { useState, useEffect } from "react";

function WeatherCard({ temperature, weather }) {
  const [currentBanner, setCurrentBanner] = useState("");
  // pretend way to sort day/night and weather conditions
  // if weather.icon[2] === 'd' {weatherBanners.day.blah blah blah}
  const weatherBanners = {
    day: {
      clear: "",
      cloudy: "",
      rain: "",
      storm: "",
      snow: "",
      fog: "",
    },
    night: {
      clear: "",
      cloudy: "",
      rain: "",
      storm: "",
      snow: "",
      fog: "",
    },
  };

  // pass it weather.icon[2] & weather.id
  function setWeatherBanner(currentTime, currentWeather) {
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
  }, []);

  return (
    // set src to currentTimeAdnWeather
    <div
      className="weatherCard"
      style={{ backgroundImage: `url('${currentBanner}')` }}
    >
      <p className="weatherCard__temperature">{`${temperature}°F`}</p>
    </div>
  );
}

export default WeatherCard;
