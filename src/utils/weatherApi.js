import { weatherApiKey } from "./constants.js";

function getWeatherData(locationlatitude, locationlongitude) {
  const latitude = locationlatitude;
  const longitude = locationlongitude;
  const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  return fetch(`${weatherApiRequest}`, {})
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
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
    cityName: `${response.name}`,
    temperature: `${response.main.temp}`,
    weather: response.weather[0],
  };

  return extractedData;
}

function temperatureCheck(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export { getWeatherData, filterWeatherData };
