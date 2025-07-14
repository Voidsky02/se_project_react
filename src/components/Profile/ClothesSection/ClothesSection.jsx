import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({ clothingItems, openClothesModal, handleCardClick }) {
  return (
    <>
      <div className="clothes-section__container">
        <div className="clothes-section__header-container">
          <h2 className="clothes-section__title">Your items</h2>
          <button
            className="clothes-section__add-btn"
            onClick={openClothesModal}
          >
            + Add new
          </button>
        </div>
        <div className="cards__container">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ClothesSection;
