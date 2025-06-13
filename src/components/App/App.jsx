import { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import { location, defaultClothingItems } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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

  function handleOffModalClick(evt) {
    if (evt.target.classList.contains("modal")) {
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
            handleOffModalClick={handleOffModalClick}
          />
        )}
        <ModalWithForm
          title={`New garmet`}
          name={`add-clothes`}
          buttonText={`Add garmet`}
          closeModal={closeModal}
          handleOffModalClick={handleOffModalClick}
        >
          <div className="add-clothes__form_element">
            <label className="add-clothes__label" htmlFor="add-clothes__name">
              Name
            </label>
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
            <label className="add-clothes__label" htmlFor="add-clothes__image">
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
    </>
  );
}

export default App;
