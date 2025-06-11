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
  const [isItemModalOpened, setIsItemModalOpened] = useState(false);

  useEffect(() => {
    getWeatherData(location.latitude, location.longitude).then((data) => {
      setWeatherData(data);
    });
    setClothingItems(defaultClothingItems);
  }, []);

  // 3 functions - openModal, closeModal, and one that changes state
  // function that takes the state as argument (if true openModal, if false closeModal)
  function openModal() {
    setIsItemModalOpened(true);
  }

  function closeModal() {
    setIsItemModalOpened(false);
  }

  function handleCardClick() {
    openModal();
  }

  return (
    <>
      <div className="page">
        {weatherData && <Header cityName={weatherData.cityName} />}
        {weatherData && clothingItems && (
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            handleCardClick={handleCardClick}
          />
        )}
        {isItemModalOpened && <ItemModal />}
        <Footer />
      </div>
    </>
  );
}

export default App;
