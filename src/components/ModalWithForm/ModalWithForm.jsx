import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  closeModal,
  handleOffModalClick,
  isOpen,
  handleSubmit,
}) {
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
          <button
            className="form-modal__submit-btn"
            type="submit"
            onSubmit={handleSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
