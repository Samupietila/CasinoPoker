import React, { useEffect, useContext } from "react";
import { GameContext, actionTypes } from "../contexts/GameContext";

function Game() {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    let timeoutId;
    switch (state.currentState) {
      case "RIVER":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_RIVER_CARD_STATE, payload: true });
        }, 500);
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.CHECK_WINNER });
        }, 500);
        break;

      case "WINNER":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_DEALER_HAND_STATE, payload: true });
        }, 500);
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.UPDATE_FUNDS });
        }, 1000);
        break;

      case "NEW_GAME_SAME_BET":
        if (state.betValue > state.funds || state.funds === 0) {
          dispatch({ type: actionTypes.NEW_GAME });
        } else {
          dispatch({ type: actionTypes.SET_DEALER_HAND_STATE, payload: false });
          dispatch({ type: actionTypes.SET_PLAYER_HAND_STATE, payload: false });
          dispatch({ type: actionTypes.SET_FLOP_CARDS_STATE, payload: false });
          dispatch({ type: actionTypes.SET_TURN_CARD_STATE, payload: false });
          dispatch({ type: actionTypes.SET_RIVER_CARD_STATE, payload: false });
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
        dispatch({ type: actionTypes.SET_DEALER_HAND_STATE, payload: false });
        dispatch({ type: actionTypes.SET_PLAYER_HAND_STATE, payload: false });
        dispatch({ type: actionTypes.SET_FLOP_CARDS_STATE, payload: false });
        dispatch({ type: actionTypes.SET_TURN_CARD_STATE, payload: false });
        dispatch({ type: actionTypes.SET_RIVER_CARD_STATE, payload: false });
        break;

      case "STARTED":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_PLAYER_HAND_STATE, payload: true });
        }, 500);
        break;

      case "FLOP":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_FLOP_CARDS_STATE, payload: true });
        }, 500);
        break;

      case "TURN":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_TURN_CARD_STATE, payload: true });
        }, 500);
        break;

      case "FOLD":
        dispatch({ type: actionTypes.UPDATE_FUNDS });
        break;

      case "CHECK_FLOP":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_FLOP_CARDS_STATE, payload: true });
          dispatch({ type: actionTypes.DEAL_TURN });
        }, 500);
        break;

      case "CHECK_TURN":
        timeoutId = setTimeout(() => {
          dispatch({ type: actionTypes.SET_TURN_CARD_STATE, payload: true });
          dispatch({ type: actionTypes.DEAL_RIVER });
        }, 500);
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
