import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";

function ControlButton({ text, actionType }) {
  const { dispatch } = useContext(GameContext);

  const handleClick = (event) => {
    dispatch({ type: actionType, payload: text });
    event.stopPropagation();
  };

  return (
    <div className="button-container" onClick={handleClick}>
      <div className="button-text">{text}</div>
    </div>
  );
}

export default React.memo(ControlButton);
