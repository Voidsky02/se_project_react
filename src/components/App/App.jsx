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
  const [itemModalData, setItemModalData] = useState({
    title: "",
    image: "",
    weather: "",
  });

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
    document.addEventListener("keydown", handleEscapeClose);
  }

  function closeModal() {
    setIsItemModalOpened(false);
    document.removeEventListener("keydown", handleEscapeClose);
  }

  function handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      closeModal();
    }
  }

  function handleCardClick(data) {
    setItemModalData({
      title: `${data.title}`,
      image: `${data.image}`,
      weather: `${data.weather}`,
    });
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
        {isItemModalOpened && (
          <ItemModal
            title={itemModalData.title}
            image={itemModalData.image}
            weather={itemModalData.weather}
            closeModal={closeModal}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
