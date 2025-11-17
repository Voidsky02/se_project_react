import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
// import isOpen from App.jsx, this will be used to add the ".modal_opened" class.
// which should be used to render the modals instead of rendering them in App

function ItemModal({
  title,
  image,
  weather,
  closeModal,
  handleOffModalClick,
  isOpen,
  openConfirmationModal,
}) {
  //  check if the delete button should be shown in the item modal
  const currentUser = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item...
  // I DONT KNOW WHERE SELECTED CARD COMES FROM
  // const isOwn = selectedCard.owner === currentUser._id;

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
        {/* delete button is rendered depending on wether card is owned by user */}
        {/* {isOwn && (
          <button
            className="item-modal__delete-btn"
            onClick={openConfirmationModal}
          >
            Delete Item
          </button>
        )} */}
        <p className="item-modal__description">{`Weather: ${weather}`}</p>
      </div>
    </div>
  );
}

export default ItemModal;
