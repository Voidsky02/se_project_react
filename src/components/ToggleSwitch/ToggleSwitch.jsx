import React, { useState } from "react";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./ToggleSwitch.css";

function ToggleSwitch({ label, value, onChange, onColor }) {
  // this is work in progress v ***STEP 5***
  const tempUnitContext = React.useContext(TemperatureUnitContext);

  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={value}
        onChange={() => {
          onChange();
          tempUnitContext.handleToggleSwitchChange();
        }}
      />
      <label
        style={{ background: value && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        {/* {label} */}
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}

export default ToggleSwitch;
