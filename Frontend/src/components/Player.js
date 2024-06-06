import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { useDebounce } from "use-debounce";

const Player = () => {
  const { state } = useContext(GameContext);
  const [debouncePotValue] = useDebounce(state.potValue, 1000);
  return (
    <div className="button-container">
      <div className="info">
        <span className="info-label">Pot:</span>
        <span className="info-value">{debouncePotValue} $</span>
      </div>
      <div className="info">
        <span className="info-label">Current Bet:</span>
        <span className="info-value">{state.betValue} $</span>
      </div>
      <div className="info">
        <span className="info-label">Bonus bet:</span>
        <span className="info-value">{state.bonusBet} $</span>
      </div>
      <div className="info">
        <span className="info-label">Player Balance:</span>
        <span className="info-value">{state.funds} $</span>
      </div>
    </div>
  );
};
export default Player;
