import React from "react";

const Card = (props) => {
  const { card, suit, value } = props;
  return (
    /* <div className="card">
      <img src={props.suit} alt={props.suit} />
      <h2>{props.value}</h2>
    </div>*/
    <div className="container">
      <div className="card-value">K</div>
      <div className="card-suit">♥</div>
    </div>
  );
};
export default Card;
