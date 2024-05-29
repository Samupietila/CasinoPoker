import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";

function ControlButton({ text, actionType }) {
  const { dispatch } = useContext(GameContext);

  useEffect(() => {
    console.log("Control Button Rendered");
  }, []);

  console.log(actionType);
  console.log(text);

  const handleClick = (event) => {
    dispatch({ type: actionType, payload: text });
    console.log("Control button Clicked");
    event.stopPropagation();
  };

  return (
    <div className="button-container" onClick={handleClick}>
      <div className="button-text">{text}</div>
    </div>
  );
}

export default React.memo(ControlButton);
