import { useState, useEffect } from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
}) {
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    // console.log(handleOffModalClick)

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, []);

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
        <h2 className="confirmation-modal__title">
          Are you sure you want to delete this item?<br></br> This action is
          irreversible.
        </h2>
        <button className="confirmation__delete-btn">Yes, delete item</button>
        <button className="confirmation__cancel-btn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
