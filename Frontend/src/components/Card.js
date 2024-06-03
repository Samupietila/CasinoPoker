import React from "react";
import CardFaceDown from "./CardFaceDown";

const Card = (props) => {
  const { suit, value, isFaceUp } = props;
  const isRed = suit === "♥" || suit === "♦";
  return (
    <>
      {isFaceUp ? (
        <>
          <div className="card-container">
            <div className={`card-value ${isRed ? "red-text" : ""}`}>
              {value}
            </div>
            <div className={`card-suit ${isRed ? "red-text" : ""}`}>{suit}</div>
          </div>
        </>
      ) : (
        <CardFaceDown />
      )}
    </>
  );
};
export default Card;
