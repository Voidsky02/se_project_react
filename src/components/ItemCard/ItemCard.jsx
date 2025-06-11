function ItemCard({ itemName, itemImage }) {
  return (
    <>
      <div className="item__card">
        <h2 className="item__name">{`${itemName}`}</h2>
        <img className="item__image" src={itemImage} />
      </div>
    </>
  );
}

export default ItemCard;
