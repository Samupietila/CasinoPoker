import { useContext } from "react";
import { GameDispatchContext } from "../App";

export const useControlButton = (props, actionType) => {
  const dispatch = useContext(GameDispatchContext);

  const handleClick = () => {
    dispatch({ type: actionType });
    console.log("Control button Clicked");
  };

  return () => {
    handleClick();
  };
};
