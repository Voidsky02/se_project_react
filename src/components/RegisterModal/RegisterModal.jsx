import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

const RegisterModal = ({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  onSignUp,
}) => {

  const { values, handleChange, resetForm } = useForm({email: "", password: "", name: "", avatar: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignUp(values)
      .then(() => {
        return resetForm();
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
          className="sign-up__input sign-up__input_type_text"
          id="sign-up__email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
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
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
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
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
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
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
