import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";

function ControlButton({ text, actionType, state }) {
  const { dispatch } = useContext(GameContext);

  const handleClick = (event) => {
    dispatch({ type: actionType, payload: text });
    event.stopPropagation();
  };

  useEffect(() => {
    console.log("Control Button Rendered");
  }, []);

  return (
    <>
      {state ? (
        <div className="button-container" onClick={handleClick}>
          <div className="button-text">{text}</div>
        </div>
      ) : (
        <div className="button-container-disabled"></div>
      )}
    </>
  );
}

export default ControlButton;
