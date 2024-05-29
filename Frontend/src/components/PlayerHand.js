import React, { useContext } from "react";
import Card from "./Card";
import { GameContext } from "../contexts/GameContext";

const PlayerHand = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="player-container">
      <div className="card-slot">
        {state.playerHand[0] && (
          <Card
            suit={state.playerHand[0].suit}
            value={state.playerHand[0].card}
          />
        )}
      </div>
      <div className="card-slot">
        {state.playerHand[1] && (
          <Card
            suit={state.playerHand[1].suit}
            value={state.playerHand[1].card}
          />
        )}
      </div>
    </div>
  );
};
export default PlayerHand;
