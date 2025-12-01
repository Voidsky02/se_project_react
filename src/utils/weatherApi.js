import { weatherApiKey } from "./constants.js";
import { checkResponse } from "./api.js";

function getWeatherData(latitude, longitude) {
  const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  return fetch(`${weatherApiRequest}`, {})
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      let filteredData = filterWeatherData(data);
      return filteredData;
    })
    .catch((err) => {
      if (err === 401) {
        console.error(`Error: ${err} Unauthorized`);
      }
    });
}

function filterWeatherData(response) {
  const extractedData = {
    countryName: `${response.sys.country}`,
    cityName: `${response.name}`,
    temperature: {
      F: `${response.main.temp}`,
      C: `${Math.round(((response.main.temp - 32) * 5) / 9)}`,
    },
    weather: response.weather[0],
  };

  return extractedData;
}

function checkFahrenheitTemperature(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

function checkCelsiusTemperature(temperature) {
  if (temperature >= 30) {
    return "hot";
  } else if (temperature >= 18) {
    return "warm";
  } else {
    return "cold";
  }
}

function checkTemperature(temperature, tempUnit) {
  if (tempUnit === "F") {
    return checkFahrenheitTemperature(temperature);
  } else {
    return checkCelsiusTemperature(temperature);
  }
}

export { getWeatherData, filterWeatherData, checkTemperature };
