import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  countryName,
  cityName,
  openClothesModal,
  checked,
  onChange,
  onColor,
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
          <img className="header__image" src={siteLogo} alt="site-logo" />
          <p className="header__date-location">{`${currentDate}, ${location}`}</p>
        </div>
        <div className="header__right-side">
          <ToggleSwitch
            label="F"
            value={checked}
            onChange={onChange}
            onColor={onColor}
          />
          <p
            className="header__button"
            type="button"
            onClick={openClothesModal}
          >
            + Add Clothes
          </p>
          {/* Was told I may be right in making User a component, */}
          {/* but for now, it is not required */}
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
