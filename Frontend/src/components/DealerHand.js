import React, { useContext } from "react";
import Card from "./Card";
import { GameContext } from "../contexts/GameContext";
import Deck from "./Deck";

const DealerHand = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="dealer-container">
      <div className="card-slot">
        {state.dealerHand[0] && (
          <Card
            suit={state.dealerHand[0].suit}
            value={state.dealerHand[0].card}
            isFaceUp={state.dealerHandState}
          />
        )}
      </div>
      <div className="card-slot">
        {state.dealerHand[1] && (
          <Card
            suit={state.dealerHand[1].suit}
            value={state.dealerHand[1].card}
            isFaceUp={state.dealerHandState}
          />
        )}
      </div>
      <Deck />
    </div>
  );
};
export default DealerHand;
