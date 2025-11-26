import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi.js";
import { location, weatherOptions } from "../../utils/constants.js";
import { signIn, signUp, validateToken } from "../../utils/auth.js";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import {
  getClothingItems,
  postClothingItems,
  deleteClothingItems,
  updateUserData,
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

  // check if a user token already exists
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      validateToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          console.log("TOKEN VERIFIED SUCCESSFULLY");
          console.log(`USER DATA = ${JSON.stringify(userData)}`);
        })
        .catch((error) => {
          console.log(`Error ${error}: Token validation failed`);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

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
        // ???? accidently changed this at some point
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

  function openLogInModal() {
    setOpenModal("log-in");
  }

  function openRegisterModal() {
    setOpenModal("register");
  }

  function openEditProfileModal() {
    setOpenModal("edit-profile");
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

  // signup function -> Attach this function to submit button on sign-up modal
  function handleSignUpSubmit({ name, avatar, email, password }) {
    // call fetch request function from auth.js here
    return signUp({ name, avatar, email, password })
      .then((data) => {
        // Do more with this later - probably save to state or local storage
        return console.log(data); // this is being returned as undefined
      })
      .catch((error) => console.error(`Error: Could not register ${error}`));
  }

  /*
  /signIn function that:
  1. Sends credentials
  2. Saves token to localStorage if request successful
  */
  const handleSignInSubmit = ({ email, password }) => {
    // Check that the server gave access in its respone?
    return signIn({ email, password })
      .then((res) => {
        console.log(`handleSignInSubmit = ${JSON.stringify(res)}`);
        console.log(`TOKEN = ${res.token}`);
        // i dont know if this is good enough or correct structure
        localStorage.setItem("jwt", res.token);
        return validateToken(res.token);
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((error) => console.error(`Error ${error}: Could not sign in`));
  };

  const handleSignOut = () => {
    // doesnt require any api calls correct? just...
    // #1. Remove token from local storage
    localStorage.removeItem("jwt");
    // #2. Change isLoggedIn to false
    setIsLoggedIn(false);
  };

  // schools boilerplate -> adjust as needed to fit my code
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
                  isLoggedIn={isLoggedIn}
                  openLogInModal={openLogInModal}
                  openRegisterModal={openRegisterModal}
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
                        onCardLike={handleCardLike}
                      />
                    )
                  }
                />

                <Route
                  path="/profile"
                  element={
                    clothingItems && (
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile
                          clothingItems={clothingItems}
                          openClothesModal={openClothesModal}
                          handleCardClick={handleCardClick}
                          openEditProfileModal={openEditProfileModal}
                          handleSignOut={handleSignOut}
                        />
                      </ProtectedRoute>
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
                onSignIn={handleSignInSubmit}
              />
              {/* need to add 'or log in' button */}
              <RegisterModal
                closeModal={closeModal}
                handleOffModalClick={handleOffModalClick}
                handleEscapeClose={handleEscapeClose}
                // Temp so i can see whats happenning
                isOpen={openModal === "register"}
                onSignUp={handleSignUpSubmit}
              />

              <EditProfileModal
                closeModal={closeModal}
                handleOffModalClick={handleOffModalClick}
                handleEscapeClose={handleEscapeClose}
                // Temp so i can see whats happenning...openModal === "edit-profile"
                isOpen={openModal === "edit-profile"}
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
