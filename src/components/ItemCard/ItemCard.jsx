import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ handleCardClick, item, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // pass item data in same way we did handleClick()
  const handleLike = (event) => {
    // stops the onClick handler of the itemCard itself from firing when like button clicked
    event.stopPropagation();
    const itemInfo = {
      id: item._id,
      isLiked: isLiked,
    };
    onCardLike(itemInfo);
  };

  return (
    <>
      <div
        onClick={() => {
          const itemModalInfo = {
            title: item.name,
            image: item.imageUrl,
            weather: item.weather,
            id: item._id,
            owner: item.owner,
          };
          handleCardClick(itemModalInfo);
        }}
        className="item__card"
      >
        <div className="item__header">
          <h2 className="item__name">{item.name}</h2>
          {isLoggedIn ? (
            <>
              <button className="item__button" onClick={handleLike}>
                <img
                  className="item__button_image"
                  src={
                    isLiked
                      ? "src/images/heart-liked.svg"
                      : "src/images/heart-default.svg"
                  }
                  alt="heart-icon"
                />
              </button>
            </>
          ) : (
            <></>
          )}
        </div>

        <img className="item__image" src={item.imageUrl} alt={item.name} />
      </div>
    </>
  );
}

export default ItemCard;
