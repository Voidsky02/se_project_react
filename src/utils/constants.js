// const weatherApiKey = `0c623deb4e882f77c46f66d3765e86c9`;

// should i create a class with a name property, so i can dynamically add more locations?
// const location = {
//   name: "Hawaii"
//   latitude: 20.7503,
//   longitude: -156.5003,
// };

// const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=${weatherApiKey}`;

function getWeatherData(locationlatitude, locationlongitude) {
  const latitude = locationlatitude;
  const longitude = locationlongitude;
  const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=0c623deb4e882f77c46f66d3765e86c9`;

  return fetch(`${weatherApiRequest}`, {})
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

export default getWeatherData;
