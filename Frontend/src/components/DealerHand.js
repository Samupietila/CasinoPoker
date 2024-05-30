import React, { useContext } from "react";
import Card from "./Card";
import { GameContext } from "../contexts/GameContext";

const DealerHand = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="dealer-container">
      <div className="card-slot">
        {state.dealerHand[0] && (
          <Card
            suit={state.dealerHand[0].suit}
            value={state.dealerHand[0].card}
          />
        )}
      </div>
      <div className="card-slot">
        {state.dealerHand[1] && (
          <Card
            suit={state.dealerHand[1].suit}
            value={state.dealerHand[1].card}
          />
        )}
      </div>
    </div>
  );
};
export default DealerHand;