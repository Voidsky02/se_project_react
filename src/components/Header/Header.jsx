import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  countryName,
  cityName,
  openClothesModal,
  checked,
  onChange,
  isLoggedIn,
  openLogInModal,
  openRegisterModal,
}) {
  const siteLogo = "src/images/site-logo.svg";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = `${cityName} (${countryName})`;
  const userPicture = "src/images/temp-profile-pic.svg";

  // change styles depending on wether user is authorized or not
  const currentUser = useContext(CurrentUserContext);

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
          {isLoggedIn ? (
            <>
              {/* rendered when logged in */}
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
                <div className="header__user">
                  <p className="header__user-name">Terrence Tegegne</p>
                  {/* // if there is no image provided, set placeholder w/ the users  */}
                  {/* first letter of name */}
                  <img
                    className="header__user-image"
                    src={userPicture /*? userPicture : placeholder */}
                    alt="temporary user picture"
                  />
                </div>
              </Link>
            </>
          ) : (
            <>
              {/* rendered when logged out */}
              <button
                className="header__button"
                onClick={() => openLogInModal()}
              >
                Sign In
              </button>
              <button
                className="header__button"
                onClick={() => openRegisterModal()}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
