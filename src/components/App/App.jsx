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
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { getClothingItems } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(null);
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
      });

    getClothingItems().then((data) => setClothingItems(data));
  }, []);

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

  function handleCardDelete(itemKey) {
    // API call

    setClothingItems(
      clothingItems.filter((item) => item._id !== cardToBeDeleted)
    );

    closeModal();
  }

  function handleCardClick(data) {
    setItemModalData({
      title: `${data.title}`,
      image: `${data.image}`,
      weather: `${data.weather}`,
      id: data.id,
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

  function handleAdditemSubmit(itemName, imageUrl, weatherTemp) {
    // methods from api.js will go here later...

    const item = {
      // _id: clothingItems[clothingItems.length - 1]._id + 1, (mabey they will tell me how to add unique id later)
      name: itemName,
      weather: weatherTemp,
      link: imageUrl,
    };

    setClothingItems([item, ...clothingItems]);
    closeModal();
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
