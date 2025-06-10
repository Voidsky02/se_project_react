import { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import { location } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

// const locationInfo = await getWeatherData(
//   location.latitude,
//   location.longitude
// );
// console.log(locationInfo);

// console.log(
//   filterWeatherData(getWeatherData(location.latitude, location.longitude))
// );

// async function test() {
//   let bruh = await getWeatherData(location.latitude, location.longitude);
//   return bruh;
// }

// let weatherInfo = await getWeatherData(location.latitude, location.longitude);

// console.log(weatherInfo);
// console.log(weatherInfo.cityName);
// console.log(weatherInfo.temperature);

// console.log(`this is from test: ${test}`);

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherData(20.7503, -156.5003).then((data) => {
      setWeatherData(data);
      console.log(data.cityName);
      console.log(data.temperature);
      console.log(data.weather);
    });
  }, []);

  return (
    <>
      <div className="page">
        <Header />
        {weatherData && <Main weatherData={weatherData} />}
        <Footer />
      </div>
    </>
  );
}

export default App;
