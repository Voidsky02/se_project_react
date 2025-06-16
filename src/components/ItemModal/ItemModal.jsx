import { useState, useEffect } from "react";

function ItemModal({
  title,
  image,
  weather,
  closeModal,
  handleOffModalClick,
  handleEscapeClose,
}) {
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, []);

  return (
    <div className="modal modal_opened" onClick={handleOffModalClick}>
      <div className="modal__container modal__container_type_item-modal">
        <button
          className="modal__close-btn item-modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <img className="item-modal__image" src={image} />
        <h3 className="item-modal__title">{title}</h3>
        <p className="item-modal__description">{`Weather: ${weather}`}</p>
      </div>
    </div>
  );
}

export default ItemModal;
