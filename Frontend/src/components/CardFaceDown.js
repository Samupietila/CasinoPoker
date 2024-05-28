import React from "react";
const imagePath = require("../assets/images/cardFaceDown.png");

const CardFaceDown = () => {
  return (
    <div className="card-container">
      <img className="card-face-down" src={imagePath} />
    </div>
  );
};
export default CardFaceDown;
