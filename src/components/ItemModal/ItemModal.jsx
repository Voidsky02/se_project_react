function ItemModal({ closeModal }) {
  const itemModalImage =
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591";
  const itemModalTitle = "Cap";
  const itemModalTemp = "Hot";

  //   believe im going to set the state here, then create a function that will alter the state,
  // I will pass this function the the item cards so that i can attach an event listeners
  // to the card and run the function whenever it fires, opening and closing the modal

  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <button
          className="modal__close-btn item-modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <img className="item-modal__image" src={itemModalImage} />
        <h3 className="item-modal__title">{itemModalTitle}</h3>
        <p className="item-modal__description">{`Weather: ${itemModalTemp}`}</p>
      </div>
    </div>
  );
}

export default ItemModal;
