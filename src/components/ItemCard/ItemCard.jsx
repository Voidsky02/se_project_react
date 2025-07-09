function ItemCard({ itemName, itemImage, itemWeather, id, handleCardClick }) {
  return (
    <>
      <div
        onClick={() => {
          const itemModalInfo = {
            title: itemName,
            image: itemImage,
            weather: itemWeather,
            id: id,
          };
          handleCardClick(itemModalInfo);
        }}
        className="item__card"
      >
        <h2 className="item__name">{itemName}</h2>
        <img className="item__image" src={itemImage} alt={itemName} />
      </div>
    </>
  );
}

export default ItemCard;
