import { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
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

const test = filterWeatherData(
  getWeatherData(location.latitude, location.longitude)
);
console.log(`this is from test: ${test}`);

function App() {
  useEffect(() => {
    // const locationInfo = filterWeatherData(
    //   getWeatherData(location.latitude, location.longitude)
    // );
    // console.log(locationInfo);
  }, []);

  return (
    <>
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
