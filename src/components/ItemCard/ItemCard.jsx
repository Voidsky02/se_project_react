import "./ItemCard.css";

function ItemCard({ handleCardClick, item }) {
  return (
    <>
      <div
        onClick={() => {
          const itemModalInfo = {
            title: item.name,
            image: item.imageUrl,
            weather: item.weather,
            id: item._id,
          };
          handleCardClick(itemModalInfo);
        }}
        className="item__card"
      >
        <h2 className="item__name">{item.name}</h2>
        <img className="item__image" src={item.imageUrl} alt={item.name} />
      </div>
    </>
  );
}

export default ItemCard;
