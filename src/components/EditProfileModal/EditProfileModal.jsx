import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm.js";

const EditProfileModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  handleEditProfileSubmit,
}) => {
  // used to autofill current user information
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange} = useForm({ name: "", avatar: "" }, isOpen ? currentUser : null);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEditProfileSubmit(values);
  };

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
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
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
          name="avatar"
          type="url"
          placeholder="image url"
          onChange={handleChange}
          value={values.avatar}
          required
        ></input>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
