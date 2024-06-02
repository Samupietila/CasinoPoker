import React from "react";
import CardFaceDown from "./CardFaceDown";

const Card = (props) => {
  const { suit, value, isFaceUp } = props;
  return (
    <>
      {isFaceUp === "True" ? (
        <>
          <div className="card-container">
            <div className="card-value">{value}</div>
            <div className="card-suit">{suit}</div>
          </div>
        </>
      ) : (
        <CardFaceDown />
      )}
    </>
  );
};
export default Card;
