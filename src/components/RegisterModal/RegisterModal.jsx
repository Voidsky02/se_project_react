import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  onSignUp,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignUp({ name, avatar, email, password })
      .then(() => {
        return resetInputs();
      })
      .catch((err) => {
        return alert(`Error ${err}: Could not register user`);
      });
  }

  return (
    <ModalWithForm
      title={"Sign Up"}
      name={"sign-up"}
      buttonText={"Sign Up"}
      closeModal={closeModal}
      handleOffModalClick={handleOffModalClick}
      handleEscapeClose={handleEscapeClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <div className="sign-up__form_element">
        <label className="sign-up__label" htmlFor="sign-up__email">
          Email
        </label>
        <input
          className="sign-up__input sign-up__input_type_text  "
          id="sign-up__email"
          name="sign-up__email"
          type="email"
          placeholder="Email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          required
        />
      </div>
      <div className="sign-up__form_element">
        <label htmlFor="sign-up__password" className="sign-up__label">
          Password
        </label>
        <input
          className="sign-up__input sign-up__input_type_text"
          id="sign-up__password"
          name="sign-up__password"
          type="password"
          placeholder="Email"
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
          required
        />
      </div>
      <div className="sign-up__form_element">
        <label htmlFor="sign-up__name" className="sign-up__label">
          Name
        </label>
        <input
          className="sign-up__input sign-up__input_type_text"
          id="sign-up__name"
          name="sign-up__name"
          type="text"
          placeholder="Name"
          onChange={(evt) => setName(evt.target.value)}
          value={name}
          required
        />
      </div>
      <div className="sign-up__form_element">
        <label htmlFor="sign-up__avatar" className="sign-up__label">
          Avatar URL
        </label>
        <input
          className="sign-up__input sign-up__input_type_text"
          id="sign-up__avatar"
          name="sign-up__avatar"
          type="url"
          placeholder="Avatar URL"
          onChange={(evt) => setAvatar(evt.target.value)}
          value={avatar}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
