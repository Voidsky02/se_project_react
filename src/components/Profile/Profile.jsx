import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ clothingItems }) {
  return (
    <>
      <Sidebar />
      <ClothesSection clothingItems={clothingItems} />
    </>
  );
}

export default Profile;
