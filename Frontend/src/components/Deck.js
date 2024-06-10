import React from "react";
import CardFaceDown from "./CardFaceDown";

const Deck = () => {
  const cards = new Array(15).fill(null);

  return (
    <div className="deck">
      {cards.map((_, index) => (
        <CardFaceDown key={index} />
      ))}
    </div>
  );
};

export default Deck;
