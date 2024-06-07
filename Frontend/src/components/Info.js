import React, { useState, useEffect } from "react";

const Info = ({ label, value, animate = true }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [change, setChange] = useState("");

  useEffect(() => {
    if (animate) {
      if (value > prevValue) {
        setChange("positive");
      } else if (value < prevValue) {
        setChange("negative");
      }

      const timer = setTimeout(() => {
        setChange("");
      }, 1000);

      setPrevValue(value);

      return () => clearTimeout(timer);
    }
    setPrevValue(value);
  }, [value, prevValue, animate]);

  return (
    <div className="info">
      <span className="info-label">{label}</span>
      <span className={`info-value ${change}`}>{value} $</span>
    </div>
  );
};
export default Info;
