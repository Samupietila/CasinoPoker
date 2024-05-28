import React from "react";

const Card = (props) => {
  const { suit, value } = props;
  return (
    <div className="navbar-card-container">
      <div className="navbar-card-value">{value}</div>
      <div className="navbar-card-suit">{suit}</div>
    </div>
  );
};
export default Card;
