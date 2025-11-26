import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
}) => {
  // use CurrentUserContext to fill the input fields with the current user data
  const userContext = useContext(CurrentUserContext);

  // initial state is the logged-in users info
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // get users info on load, and fill inputs with current data
  useEffect(() => {
    // #1. get currentUserContext and set state variables
    // Then set value of inputs to state variable, and have their onChange
    // events update the state. This wont create infinite loop cause it only
    // sets the value when page loads, not on every update.
    //
    // but do have currentUserContext as a dependent so if THAT changes it
    // re-renders
    setName(userContext.name);
    setImageUrl(userContext.avatar);
  }, [userContext, isOpen]);

  return (
    <ModalWithForm
      title={"Change profile data"}
      name={"edit-profile"}
      buttonText={"Save Changes"}
      closeModal={closeModal}
      handleOffModalClick={handleOffModalClick}
      handleEscapeClose={handleEscapeClose}
      isOpen={isOpen}
      //   handleSubmit - made in file (based on how AddItemModal did it)
    >
      <div className="edit-profile__form_element">
        <label className="edit-profile__label" htmlFor="edit-profile__name">
          Name
        </label>
        <input
          className="edit-profile__input edit-profile__input_type_text"
          id="edit-profile__name"
          name="edit-profile__name"
          type="text"
          placeholder="Name"
          onChange={(evt) => setName(evt.target.value)}
          value={name}
          required
        ></input>
      </div>
      {/* avatar input below */}
      <div className="edit-profile__form_element">
        <label className="edit-profile__label" htmlFor="edit-profile__avatar">
          Avatar
        </label>
        <input
          className="edit-profile__input edit-profile__input_type_text"
          id="edit-profile__avatar"
          name="edit-profile__avatar"
          type="url"
          placeholder="image url"
          onChange={(evt) => setImageUrl(evt.target.value)}
          value={imageUrl}
          required
        ></input>
      </div>
    </ModalWithForm>
    // NEED API TO UPDATE PROFILE DATA WITH THIS FORMS DATA
  );
};

export default EditProfileModal;
