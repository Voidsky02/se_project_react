import "./Sidebar.css";

function Sidebar() {
  const userPicture = "src/images/temp-profile-pic.svg";

  return (
    <>
      <div className="sidebar__user">
        <img
          className="sidebar__user-image"
          src={userPicture}
          alt="temporary user picture"
        />
        <p className="sidebar__user-name">Terrence Tegegne</p>
      </div>
    </>
  );
}

export default Sidebar;
