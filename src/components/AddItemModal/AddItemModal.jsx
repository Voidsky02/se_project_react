import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  return (
    <ModalWithForm
      title={"New garmet"}
      name={"add-clothes"}
      buttonText={"Add garmet"}
      closeModal={closeModal}
      handleOffModalClick={handleOffModalClick}
      handleEscapeClose={handleEscapeClose}
      isOpen={isOpen}
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
          onChange={(evt) => setName(evt.target.value)}
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
          onChange={(evt) => setImageUrl(evt.target.value)}
          required
        ></input>
      </div>
      <div className="add-clothes__weather_container">
        <label className="add-clothes__label">Select the weather type:</label>
        <div className="add-clothes__radio-container">
          <input
            className="add-clothes__input"
            id="hot"
            name="weather"
            type="radio"
            value="hot"
            onChange={(evt) => setWeather(evt.target.value)}
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
            onChange={(evt) => setWeather(evt.target.value)}
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
            onChange={(evt) => setWeather(evt.target.value)}
          ></input>
          <label className="add-clothes__label_type_radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
