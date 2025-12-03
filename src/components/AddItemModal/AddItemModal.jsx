import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

function AddItemModal({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  onAddItem,
}) {
  
  const { values, handleChange, resetForm } = useForm({ name: "", imageUrl: "", weather: "" });

  // const resetInputs = () => {
  //   setName("");
  //   setImageUrl("");
  //   setWeather("");
  // };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values.name, values.imageUrl, values.weather)
      .then(() => {
        return resetForm();
      })
      .catch((err) => {
        return alert(`Error ${err}: Could not submit clothing item`);
      });
  }

  return (
    <ModalWithForm
      title={"New garment"}
      name={"add-clothes"}
      buttonText={"Add garment"}
      closeModal={closeModal}
      handleOffModalClick={handleOffModalClick}
      handleEscapeClose={handleEscapeClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <div className="add-clothes__form_element">
        <label className="add-clothes__label" htmlFor="add-clothes__name">
          Name
        </label>
        <input
          className="add-clothes__input add-clothes__input_type_text"
          id="add-clothes__name"
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
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
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
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
            onChange={handleChange}
            checked={values.weather === "hot"}
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
            onChange={handleChange}
            checked={values.weather === "warm"}
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
            onChange={handleChange}
            checked={values.weather === "cold"}
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
