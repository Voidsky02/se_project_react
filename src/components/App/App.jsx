import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import { location, weatherOptions } from "../../utils/constants.js";
import { signIn, signUp } from "../../utils/auth.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
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
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  /*
  /signIn function that:
  1. Sends credentials
  2. Saves token to localStorage if request successful
  */
  const signInUser = ({ email, password }) => {
    // Check that the server gave access in its respone?
    return signIn({ email, password }).then((res) => {
      // i dont know if this is good enough or correct structure
      return localStorage.setItem("jwt", res.token);
    });
  };

  return (
    <>
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
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
                  // different styles for logged in vs non-logged in
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

              {/* Add LogIn Modal here */}
              <LoginModal
                closeModal={closeModal}
                handleOffModalClick={handleOffModalClick}
                handleEscapeClose={handleEscapeClose}
                // Temp so i can see whats happenning
                isOpen={openModal === "log-in"}
              />
              <RegisterModal
                closeModal={closeModal}
                handleOffModalClick={handleOffModalClick}
                handleEscapeClose={handleEscapeClose}
                // Temp so i can see whats happenning
                isOpen={openModal === "register"}
              />

              <EditProfileModal
                closeModal={closeModal}
                handleOffModalClick={handleOffModalClick}
                handleEscapeClose={handleEscapeClose}
                // Temp so i can see whats happenning...openModal === "edit-profile"
                isOpen={true === true}
              />

              <Footer />
            </div>
          </TemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
