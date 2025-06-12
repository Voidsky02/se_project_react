function ModalWithForm({ closeModal, handleOffModalClick }) {
  return (
    <div className="modal modal_opened" onClick={handleOffModalClick}>
      <div className="modal__container">
        <button
          className="modal__close-btn form-modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <h2 className="form-modal__title"></h2>
        <form className="form-modal__form"></form>
        <button className="form-modal__submit-btn" type="submit"></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
