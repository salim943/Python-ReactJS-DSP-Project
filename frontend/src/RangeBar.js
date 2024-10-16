import React, { useState } from "react";
import { Slider } from "@mui/material";

const RangeBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = ( newValue) => {
    setValue(newValue);
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      aria-label="Volume"
      valueLabelDisplay="auto"
      min={0}
      max={10000}
    />
  );
};

export default RangeBar;