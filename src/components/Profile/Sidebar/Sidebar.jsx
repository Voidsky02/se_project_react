import "./Sidebar.css";

function Sidebar({ openEditProfileModal, handleSignOut }) {
  const userPicture = "src/images/temp-profile-pic.svg";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__user-image"
          src={userPicture}
          alt="temporary user picture"
        />
        <p className="sidebar__user-name">Terrence Tegegne</p>
      </div>
      {/* implement edit-profile button below */}
      <button
        className="sidebar__button"
        onClick={() => openEditProfileModal()}
      >
        Change profile data
      </button>
      {/* implement sign-out button below */}
      <button className="sidebar__button" onClick={() => handleSignOut()}>
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;
