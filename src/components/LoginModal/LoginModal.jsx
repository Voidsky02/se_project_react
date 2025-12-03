import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

const LoginModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  onSignIn,
}) => {
  
  const { values, handleChange, resetForm } = useForm({ email: "", password: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignIn(values)
      .then(() => {
        return resetForm();
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
      handleSubmit={handleSubmit}
    >
      <div className="log-in__form_element">
        <label className="log-in__label" htmlFor="log-in__email">
          Email
        </label>
        <input
          className="log-in__input log-in__input_type_text"
          id="log-in__email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
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
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
