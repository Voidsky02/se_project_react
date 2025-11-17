import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, openClothesModal, handleCardClick }) {
  // update this component to show only the cards added by the current user
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="clothes-section__container">
      <div className="clothes-section__header-container">
        <h2 className="clothes-section__title">Your items</h2>
        <button className="clothes-section__add-btn" onClick={openClothesModal}>
          + Add new
        </button>
      </div>
      <div className="cards__container">
        {clothingItems.map((item) => {
          return (
            // only show cards owned by user provided by CurrentUserContext
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ClothesSection;
