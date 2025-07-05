import { useState, useEffect } from "react";
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
import ModalWithForm from "../ModalWithForm/ModalWithForm";
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
    console.log(currentTemperatureUnit);
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
          {weatherData && clothingItems && (
            <Main
              weatherData={weatherData}
              weatherOptions={weatherOptions}
              clothingItems={clothingItems}
              handleCardClick={handleCardClick}
            />
          )}

          <ItemModal
            title={itemModalData.title}
            image={itemModalData.image}
            weather={itemModalData.weather}
            closeModal={closeModal}
            handleOffModalClick={handleOffModalClick}
            handleEscapeClose={handleEscapeClose}
            isOpen={openModal === "item"}
          />

          <ModalWithForm
            title={"New garmet"}
            name={"add-clothes"}
            buttonText={"Add garmet"}
            closeModal={closeModal}
            handleOffModalClick={handleOffModalClick}
            handleEscapeClose={handleEscapeClose}
            isOpen={openModal === "add-clothes"}
          >
            <div className="add-clothes__form_element">
              <label className="add-clothes__label" htmlFor="add-clothes__name">
                Name
              </label>
              {/* create a function to provide error messages then.... */}
              {/* use the function on the input's onChange prop */}
              <input
                className="add-clothes__input add-clothes__input_type_text"
                id="add-clothes__name"
                name="add-clothes__name"
                type="text"
                placeholder="Name"
                required
              ></input>
            </div>
            <div className="add-clothes__form_element">
              <label
                className="add-clothes__label"
                htmlFor="add-clothes__image"
              >
                Image
              </label>
              <input
                className="add-clothes__input add-clothes__input_type_text"
                id="add-clothes__image"
                name="add-clothes__image"
                type="url"
                placeholder="Image URL"
                required
              ></input>
            </div>
            <div className="add-clothes__weather_container">
              <label className="add-clothes__label">
                Select the weather type:
              </label>
              <div className="add-clothes__radio-container">
                <input
                  className="add-clothes__input"
                  id="hot"
                  name="weather"
                  type="radio"
                  value="hot"
                ></input>
                <label className="add-clothes__label_type_radio" htmlFor="hot">
                  Hot
                </label>
              </div>
              <div className="add-clothes__radio-container">
                <input
                  className="add-clothes__input"
                  id="warm"
                  name="weather"
                  type="radio"
                  value="warm"
                ></input>
                <label className="add-clothes__label_type_radio" htmlFor="warm">
                  Warm
                </label>
              </div>
              <div className="add-clothes__radio-container">
                <input
                  className="add-clothes__input"
                  id="cold"
                  name="weather"
                  type="radio"
                  value="cold"
                ></input>
                <label className="add-clothes__label_type_radio" htmlFor="cold">
                  Cold
                </label>
              </div>
            </div>
          </ModalWithForm>

          <Footer />
        </div>
      </TemperatureUnitContext.Provider>
    </>
  );
}

export default App;
