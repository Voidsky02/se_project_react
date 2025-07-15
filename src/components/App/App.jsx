import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import { location, weatherOptions } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import {
  getClothingItems,
  postClothingItems,
  deleteClothingItems,
} from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    countryName: "",
    cityName: "",
    temperature: {
      F: "",
      C: "",
    },
    weather: {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [itemModalData, setItemModalData] = useState({
    title: "",
    image: "",
    weather: "",
    id: null,
  });
  const [openModal, setOpenModal] = useState("");

  const [cardToBeDeleted, setCardToBeDeleted] = useState(null);

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
        alert("Error: Could not retrieve weather data");
      });

    getClothingItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((err) => {
        console.error(err);
        alert("Error: Could not retrieve clothing data");
      });
  }, []);

  useEffect(() => {
    if (openModal) {
      // only add the event listener if a modal is open
      document.addEventListener("keydown", handleEscapeClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [openModal]);

  function openItemModal() {
    setOpenModal("item");
  }

  function openClothesModal() {
    setOpenModal("add-clothes");
  }

  function openConfirmationModal() {
    setOpenModal("confirmation");
    setCardToBeDeleted(itemModalData.id);
  }

  function closeModal() {
    setOpenModal("");
    setCardToBeDeleted(null);
  }

  function handleCardDelete() {
    deleteClothingItems(cardToBeDeleted)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== cardToBeDeleted)
        );
        closeModal();
      })
      .catch((err) => {
        console.error(err);
        alert("Error: Could not delete clothing item");
      });
  }

  function handleCardClick(data) {
    setItemModalData(data);
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

  function handleAdditemSubmit(itemName, imageUrl, weatherTemp) {
    return postClothingItems(itemName, imageUrl, weatherTemp).then((data) => {
      const item = {
        _id: data._id,
        name: data.name,
        weather: data.weather,
        imageUrl: data.imageUrl,
      };

      setClothingItems([item, ...clothingItems]);

      closeModal();

      return;
    });
  }

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

              <Route
                path="/profile"
                element={
                  clothingItems && (
                    <Profile
                      clothingItems={clothingItems}
                      openClothesModal={openClothesModal}
                      handleCardClick={handleCardClick}
                    />
                  )
                }
              />
            </Routes>

            <ItemModal
              title={itemModalData.title}
              image={itemModalData.image}
              weather={itemModalData.weather}
              closeModal={closeModal}
              handleOffModalClick={handleOffModalClick}
              handleEscapeClose={handleEscapeClose}
              isOpen={openModal === "item"}
              openConfirmationModal={openConfirmationModal}
            />

            <ConfirmationModal
              closeModal={closeModal}
              handleOffModalClick={handleOffModalClick}
              handleEscapeClose={handleEscapeClose}
              isOpen={openModal === "confirmation"}
              handleCardDelete={handleCardDelete}
            />

            <AddItemModal
              closeModal={closeModal}
              handleOffModalClick={handleOffModalClick}
              handleEscapeClose={handleEscapeClose}
              isOpen={openModal === "add-clothes"}
              onAddItem={handleAdditemSubmit}
            />

            <Footer />
          </div>
        </TemperatureUnitContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
