import { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData, extractData } from "../../utils/weatherApi.js";
import { location } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

// const locationInfo = await getWeatherData(
//   location.latitude,
//   location.longitude
// );
// console.log(locationInfo);

extractData(getWeatherData(location.latitude, location.longitude));

function App() {
  // useEffect(() => {
  //   const locationInfo = getWeatherData(location.latitude, location.longitude);
  //   console.log(locationInfo);
  // }, []);

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
