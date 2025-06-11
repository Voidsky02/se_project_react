function ItemModal() {
  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <button
          className="modal__close-btn item-modal__close-btn"
          type="button"
        ></button>
        <img
          className="item-modal__image"
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591"
        />
        <h3 className="item-modal__title">Cap</h3>
        <p className="item-modal__description">Weather: Hot</p>
      </div>
    </div>
  );
}

export default ItemModal;
