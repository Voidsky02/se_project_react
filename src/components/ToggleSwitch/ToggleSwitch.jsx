import React, { useState } from "react";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./ToggleSwitch.css";

function ToggleSwitch({ value, onChange }) {
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
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className="switch-letter-f">F</span>
        <span className="switch-letter-c">C</span>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}

export default ToggleSwitch;
