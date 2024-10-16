import React, { useState } from "react";

const Switch = ({ value, onChange }) => {
  const [checked, setChecked] = useState(value);

  return (
    <div className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          onChange(!checked);
        }}
      />
      <span className="slider round"></span>
    </div>
  );
};

export default Switch;