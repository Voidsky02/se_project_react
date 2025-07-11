import "./Sidebar.css";

function Sidebar() {
  const userPicture = "src/images/temp-profile-pic.svg";

  return (
    <>
      <div className="user">
        <img
          className="user__image"
          src={userPicture}
          alt="temporary user picture"
        />
        <p className="user__name">Terrence Tegegne</p>
      </div>
    </>
  );
}

export default Sidebar;
