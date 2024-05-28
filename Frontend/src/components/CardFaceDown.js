import React from "react";
const imagePath = require("../assets/images/cardFaceDown.png");
const imageStyle = {
  width: "100%",
  height: "100%",
};

const CardFaceDown = () => {
  return (
    <div className="card-container">
      <img className="card-face-down" style={imageStyle} src={imagePath} />
    </div>
  );
};
export default CardFaceDown;
