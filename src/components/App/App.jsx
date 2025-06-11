import { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import { location, defaultClothingItems } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(null);

  useEffect(() => {
    getWeatherData(location.latitude, location.longitude).then((data) => {
      setWeatherData(data);
    });
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <>
      <div className="page">
        {weatherData && <Header cityName={weatherData.cityName} />}
        {weatherData && clothingItems && (
          <Main weatherData={weatherData} clothingItems={clothingItems} />
        )}
        <ItemModal />
        <Footer />
      </div>
    </>
  );
}

export default App;
