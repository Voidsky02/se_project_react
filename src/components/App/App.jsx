import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import {
  location,
  defaultClothingItems,
  weatherOptions,
} from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [itemModalData, setItemModalData] = useState({
    title: "",
    image: "",
    weather: "",
  });
  const [openModal, setOpenModal] = useState("");

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // ToggleSwitch state
  const [checked, setChecked] = useState(false);

  // ToggleSwitch onChange function
  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    getWeatherData(location.latitude, location.longitude)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, []);

  function openItemModal() {
    setOpenModal("item");
  }

  function openClothesModal() {
    setOpenModal("add-clothes");
  }

  function closeModal() {
    setOpenModal("");
  }

  function handleCardClick(data) {
    setItemModalData({
      title: `${data.title}`,
      image: `${data.image}`,
      weather: `${data.weather}`,
    });
    openItemModal();
  }

  function handleOffModalClick(evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal();
    }
  }

  const handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      <BrowserRouter>
        <TemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            {weatherData && (
              <Header
                countryName={weatherData.countryName}
                cityName={weatherData.cityName}
                openClothesModal={openClothesModal}
                checked={checked}
                onChange={handleChange}
                onColor="#06D6A0"
              />
            )}
            <Routes>
              <Route
                path="/"
                element={
                  weatherData &&
                  clothingItems && (
                    <Main
                      weatherData={weatherData}
                      weatherOptions={weatherOptions}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                    />
                  )
                }
              />

              <Route path="/profile" element={<Profile />} />
            </Routes>

            <ItemModal
              title={itemModalData.title}
              image={itemModalData.image}
              weather={itemModalData.weather}
              closeModal={closeModal}
              handleOffModalClick={handleOffModalClick}
              handleEscapeClose={handleEscapeClose}
              isOpen={openModal === "item"}
            />

            <AddItemModal
              closeModal={closeModal}
              handleOffModalClick={handleOffModalClick}
              handleEscapeClose={handleEscapeClose}
              isOpen={openModal === "add-clothes"}
            />

            <Footer />
          </div>
        </TemperatureUnitContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
