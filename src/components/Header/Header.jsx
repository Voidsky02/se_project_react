import { useState, useEffect } from "react";

// also import sunrise and sunset from API
function Header({ cityName, openClothesModal }) {
  // const [dayOrNight, setDayOrNight] = useState(null);

  const siteLogo = "src/images/site-logo.svg";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = cityName;
  const userPicture = "src/images/temp-profile-pic.svg";

  return (
    <>
      <div className="header">
        <div className="header__left-side">
          <img className="header__image" src={siteLogo} alt="site-logo" />
          <p className="header__date-location">{`${currentDate}, ${location}`}</p>
        </div>
        <div className="header__right-side">
          <p
            className="header__button"
            type="button"
            onClick={openClothesModal}
          >
            + Add Clothes
          </p>
          {/* should i make the user element a componenet?? */}
          <div className="user">
            <p className="user__name">Terrence Tegegne</p>
            <img
              className="user__image"
              src={userPicture}
              alt="temporary user picture"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
