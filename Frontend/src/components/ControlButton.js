import React from "react";

const ControlButton = (props) => {
  const { text } = props;
  return (
    <div className="button-container">
      <div className="button-text">{text}</div>
    </div>
  );
};

export default ControlButton;
