import React from "react";

const Card = (props) => {
  const { card, suit, value } = props;
  return (
    <div className="card">
      <img src={props.suit} alt={props.suit} />
      <h2>{props.value}</h2>
    </div>
  );
};
export default Card;
