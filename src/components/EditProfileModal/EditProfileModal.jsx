import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  handleEditProfileSubmit,
}) => {
  // used to autofill current user information
  const userContext = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: name,
      avatar: avatar,
    };
    handleEditProfileSubmit(newUserInfo);
  };

  // get users info on load, and fill inputs with current data
  useEffect(() => {
    setName(userContext.name || "");
    setAvatar(userContext.avatar || "");
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
      handleSubmit={handleSubmit}
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
          onChange={(evt) => setAvatar(evt.target.value)}
          value={avatar}
          required
        ></input>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
