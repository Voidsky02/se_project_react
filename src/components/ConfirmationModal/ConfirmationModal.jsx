import "./ConfirmationModal.css";

function ConfirmationModal({
  closeModal,
  handleOffModalClick,
  isOpen,
  handleCardDelete,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOffModalClick}
    >
      <div className="modal__container modal__container_type_confirmation-modal">
        <button
          className="modal__close-btn confirmation-modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <h2 className="modal__title modal__title_type_confirmation">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          className="modal__delete-btn modal__delete-btn_type_confirmation"
          onClick={handleCardDelete}
        >
          Yes, delete item
        </button>
        <button
          className="modal__cancel-btn_type_confirmation"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
