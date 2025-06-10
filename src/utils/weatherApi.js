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
      //   const extractedData = {
      //     cityName: `${data.name}`,
      //     temperature: `${data.main.temp}`,
      //     weather: data.weather[0],
      //   };

      return data;
    })
    .catch((err) => {
      if (err === 401) {
        console.error(`Error: ${err} Unauthorized`);
      }
    });
}

function extractData(apiCall) {

    const response = await apiCall;
  //   const extractedData = {
  //     cityName: `${apiCall.name}`,
  //     temperature: `${apiCall.main.temp}`,
  //     weather: apiCall.weather[0],
  //   };

  console.log(apiCall);
  //   console.log(extractedData);

  //   return extractedData;
}

export { getWeatherData, extractData };
