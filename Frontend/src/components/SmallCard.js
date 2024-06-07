import React from "react";

const Card = (props) => {
  const { suit, value, color } = props;
  return (
    <div className="navbar-card-container">
      <div className="navbar-card-value" style={{ color: color }}>
        {value}
      </div>
      <div className="navbar-card-suit" style={{ color: color }}>
        {suit}
      </div>
    </div>
  );
};
export default Card;
