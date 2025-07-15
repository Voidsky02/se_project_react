import React from "react";
import { weatherApiKey } from "./constants.js";
import { checkResponse } from "./api.js";
// import TemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function getWeatherData(locationlatitude, locationlongitude) {
  const latitude = locationlatitude;
  const longitude = locationlongitude;
  const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;
  // const tempUnitContext = React.useContext(TemperatureUnitContext);

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

function farenhiteTemperatureCheck(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

function celsiusTemperatureCheck(temperature) {
  if (temperature >= 30) {
    return "hot";
  } else if (temperature >= 18) {
    return "warm";
  } else {
    return "cold";
  }
}

function temperatureCheck(temperature, tempUnit) {
  if (tempUnit === "F") {
    return farenhiteTemperatureCheck(temperature);
  } else {
    return celsiusTemperatureCheck(temperature);
  }
}

// function temperatureCheck(temperature) {
//   if (temperature >= 86) {
//     return "hot";
//   } else if (temperature >= 66) {
//     return "warm";
//   } else {
//     return "cold";
//   }
// }

export { getWeatherData, filterWeatherData, temperatureCheck };
