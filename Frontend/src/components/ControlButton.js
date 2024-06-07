import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";

function ControlButton({ text, actionType, state }) {
  const { dispatch } = useContext(GameContext);

  const handleClick = (event) => {
    dispatch({ type: actionType, payload: text });
    event.stopPropagation();
  };

  return (
    <>
      {state ? (
        <div className="button-container" onClick={handleClick}>
          {text}
        </div>
      ) : (
        <div className="button-container-disabled"></div>
      )}
    </>
  );
}

export default ControlButton;
