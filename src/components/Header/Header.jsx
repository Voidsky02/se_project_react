function Header() {
  const siteLogo = "src/images/site-logo.svg";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = "Temp Location";
  const userPicture = "src/images/temp-profile-pic.svg";

  return (
    <>
      <div className="header">
        <img className="header__image" src={siteLogo} alt="site-logo" />
        <p className="header__date-location">{`${currentDate}, ${location}`}</p>
        <button className="header__button" type="button">
          + Add Clothes
        </button>
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
    </>
  );
}

export default Header;
