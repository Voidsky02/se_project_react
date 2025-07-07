import { useState, useEffect } from "react";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  handleSubmit,
}) {
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    //
    // how to pass current state of this modal to the closeModal() func
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, []);

  return (
    <div
      className={`modal ${isOpen && "modal_opened"} modal_type_${name}`}
      onClick={handleOffModalClick}
    >
      <div className={`modal__container modal__container_type_${name}`}>
        <button
          className="modal__close-btn form-modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <h3 className="form-modal__title">{title}</h3>
        <form className="form-modal__form" name={name}>
          {children}
        </form>
        <button
          className="form-modal__submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
