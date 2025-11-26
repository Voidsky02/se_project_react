import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  onSignIn,
}) => {
  // state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  //   NEED FETCH REQUEST THAT LOGS IN, REPLACE ONADDITEM
  function handleSubmit(evt) {
    evt.preventDefault();
    onSignIn({ email, password })
      .then(() => {
        return resetInputs();
      })
      .catch((err) => {
        return alert(`Error ${err}: Could not submit clothing item`);
      });
  }

  return (
    <ModalWithForm
      title={"Log In"}
      name={"log-in"}
      buttonText={"Log in"}
      closeModal={closeModal}
      handleOffModalClick={handleOffModalClick}
      handleEscapeClose={handleEscapeClose}
      isOpen={isOpen}
      //   handleSubmit - made in file (based on how AddItemModal did it)
      handleSubmit={handleSubmit}
    >
      <div className="log-in__form_element">
        <label className="log-in__label" htmlFor="log-in__email">
          Email
        </label>
        <input
          className="log-in__input log-in__input_type_text  "
          id="log-in__email"
          name="log-in__email"
          type="email"
          placeholder="Email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          required
        />
      </div>
      <div className="log-in__form_element">
        <label htmlFor="log-in__password" className="log-in__label">
          Password
        </label>
        <input
          className="log-in__input log-in__input_type_text"
          id="log-in__password"
          name="log-in__password"
          type="password"
          placeholder="Email"
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
