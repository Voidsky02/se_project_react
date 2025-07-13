import { useState, useEffect } from "react";
// import isOpen from App.jsx, this will be used to add the ".modal_opened" class.
// which should be used to render the modals instead of rendering them in App

function ItemModal({
  title,
  image,
  weather,
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
  isOpen,
  openConfirmationModal,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOffModalClick}
    >
      <div className="modal__container modal__container_type_item-modal">
        <button
          className="modal__close-btn item-modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <img className="item-modal__image" src={image} alt={`${title}`} />
        <h3 className="item-modal__title">{title}</h3>
        <button
          className="item-modal__delete-btn"
          onClick={openConfirmationModal}
        >
          {/* was told "Item" word wraps onto new line, but cannot see it from my browser,
          can reviewer please tell me how to see it so i can correct the mistake, Thank you */}
          Delete Item
        </button>
        <p className="item-modal__description">{`Weather: ${weather}`}</p>
      </div>
    </div>
  );
}

export default ItemModal;
