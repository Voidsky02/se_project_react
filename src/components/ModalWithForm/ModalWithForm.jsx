function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  closeModal,
  handleOffModalClick,
}) {
  return (
    <div
      // replace test with the name prop
      className={`modal modal_opened modal_type_${name}`}
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
        <button className="form-modal__submit-btn" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
