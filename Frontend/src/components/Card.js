import React from "react";

const Card = (props) => {
  const { suit, value } = props;
  return (
    /* <div className="container">
      <div className="card-value">{prop.value}</div>
      <div className="card-suit">{prop.suit}</div>
    </div>*/
    <div className="card-container">
      <div className="card-value">K</div>
      <div className="card-suit">♥</div>
    </div>
  );
};
export default Card;
