import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const Player = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="info-container">
      <div className="info">
        <span className="info-label">Pot:</span>
        <span className="info-value">{state.potValue} $</span>
      </div>
      <div className="info">
        <span className="info-label">Current Bet:</span>
        <span className="info-value">{state.betValue} $</span>
      </div>
      <div className="info">
        <span className="info-label">Player Balance:</span>
        <span className="info-value">{state.funds} $</span>
      </div>
    </div>
  );
};
export default Player;
