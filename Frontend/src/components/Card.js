import React from "react";

const Card = (props) => {
  const { suit, value } = props;
  return (
    <div className="card-container">
      <div className="card-value">{value}</div>
      <div className="card-suit">{suit}</div>
    </div>
  );
};
export default Card;
