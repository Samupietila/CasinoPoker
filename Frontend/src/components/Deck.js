import React from "react";
import CardFaceDown from "./CardFaceDown";

const Deck = () => {
  return (
    <div className="deck">
      <CardFaceDown />
      <CardFaceDown />
      <CardFaceDown />
      <CardFaceDown />
    </div>
  );
};

export default Deck;
