import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection(clothingItems) {
  return (
    <>
      <div className="cards__container">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              id={item._id}
              itemName={item.name}
              itemImage={item.imageUrl}
              itemWeather={item.weather}
              //   handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </>
  );
}

export default ClothesSection;
