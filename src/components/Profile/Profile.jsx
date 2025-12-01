import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  openClothesModal,
  handleCardClick,
  openEditProfileModal,
  handleSignOut,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <main className="profile__container">
      <Sidebar
        openEditProfileModal={openEditProfileModal}
        handleSignOut={handleSignOut}
      />
      <ClothesSection
        clothingItems={clothingItems}
        openClothesModal={openClothesModal}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}

export default Profile;
