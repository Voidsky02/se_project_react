import { useContext } from "react";
import "./Sidebar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function Sidebar({ openEditProfileModal, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser.avatar ? (
          <img
            className="sidebar__user-image"
            src={currentUser.avatar}
            alt="Users profile picture"
          />
        ) : (
          <div className="sidebar__user-image user-image__placeholder">
            {currentUser.name[0]}
          </div>
        )}
        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>

      <button
        className="sidebar__button"
        onClick={() => openEditProfileModal()}
      >
        Change profile data
      </button>

      <button className="sidebar__button" onClick={() => handleSignOut()}>
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;
