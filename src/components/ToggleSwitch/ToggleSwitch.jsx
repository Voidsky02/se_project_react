import { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ label, value, onChange, onColor }) {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={value}
        onChange={onChange}
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
