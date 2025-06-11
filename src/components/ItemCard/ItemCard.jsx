function ItemCard({ itemName, itemImage, handleCardClick }) {
  return (
    <>
      <div onClick={handleCardClick} className="item__card">
        <h2 className="item__name">{`${itemName}`}</h2>
        <img className="item__image" src={itemImage} />
      </div>
    </>
  );
}

export default ItemCard;
