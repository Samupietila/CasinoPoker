import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const Player = (props) => {
  const { potValue, betValue, funds } = props;
  return (
    <div className="info-container">
      <div className="info">
        <span className="info-label">Pot:</span>
        <span className="info-value">{potValue} $</span>
      </div>
      <div className="info">
        <span className="info-label">Current Bet:</span>
        <span className="info-value">{betValue} $</span>
      </div>
      <div className="info">
        <span className="info-label">Player Balance:</span>
        <span className="info-value">{funds} $</span>
      </div>
    </div>
  );
};
export default Player;
