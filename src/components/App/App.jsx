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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [itemModalData, setItemModalData] = useState({
    title: "",
    image: "",
    weather: "",
  });
  // above modal states will probably be deleted
  const [openModal, setOpenModal] = useState("");
  // dont know how bottom cpde will be implemented
  // const [isOpen, setIsOpen] = useState("");
  // mabey set isOpen to the name of the modal i want to open

  useEffect(() => {
    getWeatherData(location.latitude, location.longitude)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, []);

  // NEW OPEN AND CLOSE MODAL FUNCTIONS
  function openItemModal() {
    setOpenModal("item");
  }

  function openClothesModal() {
    setOpenModal("add-clothes");
  }

  function closeModal() {
    // change to just setOpenModal(null); i think this must still be function
    // so i can pass it down to other components
    setOpenModal("");
    // document.removeEventListener("keydown", handleEscapeClose);
  }

  function handleCardClick(data) {
    setItemModalData({
      title: `${data.title}`,
      image: `${data.image}`,
      weather: `${data.weather}`,
    });
    setOpenModal("item");
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
      <div className="page">
        {weatherData && (
          <Header
            countryName={weatherData.countryName}
            cityName={weatherData.cityName}
            openClothesModal={openClothesModal}
          />
        )}
        {weatherData && clothingItems && (
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            handleCardClick={handleCardClick}
          />
        )}
        {openModal === "item" && (
          <ItemModal
            title={itemModalData.title}
            image={itemModalData.image}
            weather={itemModalData.weather}
            closeModal={closeModal}
            handleOffModalClick={handleOffModalClick}
            handleEscapeClose={handleEscapeClose}
            openModal={openModal}
          />
        )}
        {openModal === "add-clothes" && (
          <ModalWithForm
            title={"New garmet"}
            name={"add-clothes"}
            buttonText={"Add garmet"}
            closeModal={closeModal}
            handleOffModalClick={handleOffModalClick}
            handleEscapeClose={handleEscapeClose}
            openModal={openModal}
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
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
