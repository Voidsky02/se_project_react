import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  countryName,
  cityName,
  openClothesModal,
  checked,
  onChange,
}) {
  const siteLogo = "src/images/site-logo.svg";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = `${cityName} (${countryName})`;
  const userPicture = "src/images/temp-profile-pic.svg";

  return (
    <>
      <div className="header">
        <div className="header__left-side">
          <Link to="/">
            <img className="header__image" src={siteLogo} alt="site-logo" />
          </Link>
          <p className="header__date-location">{`${currentDate}, ${location}`}</p>
        </div>
        <div className="header__right-side">
          <ToggleSwitch value={checked} onChange={onChange} />
          <p
            className="header__button"
            type="button"
            onClick={openClothesModal}
          >
            + Add Clothes
          </p>
          {/* Was told I may be right in making User a component, */}
          {/* but for now, it is not required */}
          <Link to="/profile">
            <div className="user">
              <p className="user__name">Terrence Tegegne</p>
              <img
                className="user__image"
                src={userPicture}
                alt="temporary user picture"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
