import React, { useEffect, useContext } from "react";
import { GameContext, actionTypes } from "../contexts/GameContext";

function Game() {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    let timeoutId;
    switch (state.currentState) {
      case "RIVER":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.CHECK_WINNER });
        }, 1000);
        break;
      case "WINNER":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.UPDATE_FUNDS });
        }, 500);
        break;
      case "NEW_GAME_SAME_BET":
        if (state.betValue > state.funds || state.funds === 0) {
          dispatch({ type: actionTypes.NEW_GAME });
        } else {
          timeoutId = setTimeout(() => {
            dispatch({ type: actionTypes.DEAL_CARDS });
          }, 1000);
        }
        break;
      case "NOT_STARTED":
        if (state.betValue > state.funds) {
          alert("You are out of funds! Game will reset.");
          dispatch({ type: actionTypes.RESET_GAME });
        }
        break;
      case "FOLD":
        dispatch({ type: actionTypes.UPDATE_FUNDS });
        break;

      default:
        return;
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [state.currentState, dispatch]);

  return null;
}

export default Game;
