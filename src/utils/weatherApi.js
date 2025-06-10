import { weatherApiKey } from "./constants.js";

async function getWeatherData(locationlatitude, locationlongitude) {
  const latitude = locationlatitude;
  const longitude = locationlongitude;
  const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  return await fetch(`${weatherApiRequest}`, {})
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      if (err === 401) {
        console.error(`Error: ${err} Unauthorized`);
      }
    });
}

async function filterWeatherData(apiCall) {
  const response = await apiCall;

  console.log(`This is from inside filter function : ${response}`);

  const extractedData = {
    cityName: `${response.name}`,
    // temperature: `${response.main.temp}`,
    // weather: response.weather[0],
  };

  //   console.log(extractedData.cityName);
  return extractedData;
}

export { getWeatherData, filterWeatherData };
