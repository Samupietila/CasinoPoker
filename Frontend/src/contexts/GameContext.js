import React from "react";

//initial state of the game
const initialState = {
  deck: [],
  funds: 1000,
  username: "Player",
  sth: () => {},
};

const actionTypes = {
  START_GAME: "START_GAME",
  PLACE_BET: "PLACE_BET",
  DEAL_CARDS: "DEAL_CARDS",
  PAY_WINNINGS: "PAY_WINNINGS",
  RESET_GAME: "RESET_GAME",
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.START_GAME:
      return {
        ...state,
        deck: action.payload.deck,
      };
    case actionTypes.PLACE_BET:
      return {
        ...state,
        funds: state.funds - action.payload.bet,
      };
    case actionTypes.DEAL_CARDS:
      return {
        ...state,
        deck: action.payload.deck,
      };
    case actionTypes.PAY_WINNINGS:
      return {
        ...state,
        funds: state.funds + action.payload.winnings,
      };
    case actionTypes.RESET_GAME:
      return {
        ...state,
        deck: [],
        funds: 1000,
      };
    default:
      return state;
  }
};
