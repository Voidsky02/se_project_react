import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ clothingItems, openClothesModal, handleCardClick }) {
  return (
    <>
      <main className="profile__container">
        <Sidebar />
        <ClothesSection
          clothingItems={clothingItems}
          openClothesModal={openClothesModal}
          handleCardClick={handleCardClick}
        />
      </main>
    </>
  );
}

export default Profile;
