import React, { useEffect } from "react";
import * as Deck from "../utils/deck";

//initial state of the game
const minBet = 10;

export const actionTypes = {
  START_GAME: "START_GAME",
  PLACE_BET: "PLACE_BET",
  DEAL_CARDS: "DEAL_CARDS",
  DEAL_FLOP: "DEAL_FLOP",
  PAY_WINNINGS: "PAY_WINNINGS",
  RESET_GAME: "RESET_GAME",
};

export const initialState = {
  deck: [],
  funds: 1000,
  potValue: 0,
  betValue: minBet,
  leftButton: "Start Game",
  rightButton: "Bet",
  currentState: "NOT_STARTED",
  leftButtonNextState: actionTypes.START_GAME,
  playerHand: [],
  dealerHand: [],
  tableCards: [],
  flopCards: [],
  turnCard: null,
  riverCard: null,
};

const getDeckLength = (deck) => {
  return console.log(deck.length);
};

export const gameReducer = (state, action) => {
  console.log(action);
  console.log("state changed", action);
  switch (action.type) {
    case actionTypes.START_GAME:
      const deckStart = Deck.generateDeck();
      Deck.shuffleDeck(deckStart);
      getDeckLength(deckStart);
      return {
        ...state,
        deck: deckStart,
        leftButton: "started game",
        leftButtonNextState: actionTypes.DEAL_CARDS,
      };

    case actionTypes.PLACE_BET:
      console.log(state.betValue);
      const newBet = state.betValue + minBet;
      console.log(newBet);
      return {
        ...state,
        betValue: newBet,
      };

    case actionTypes.DEAL_CARDS:
      const deckDeal = state.deck;
      const playerHand = Deck.dealHand(deckDeal, 2);
      console.log(playerHand);
      const dealerHand = Deck.dealHand(deckDeal, 2);
      console.log(dealerHand);
      const potValue = state.betValue * 2;
      console.log(potValue);
      getDeckLength(deckDeal);
      return {
        ...state,
        deck: deckDeal,
        potValue: potValue,
        leftButton: "next is flop",
        rightButton: "Fold",
        playerHand: playerHand,
        dealerHand: dealerHand,
        leftButtonNextState: actionTypes.DEAL_FLOP,
      };

    case actionTypes.DEAL_FLOP:
      const deckFlop = state.deck;
      const flopCards = Deck.dealFlop(deckFlop);
      console.log(flopCards);
      getDeckLength(deckFlop);
      return {
        ...state,
        deck: deckFlop,
        flopCards: flopCards,
        leftButton: "next is turn",
        rightButton: "Fold",
      };

    case actionTypes.PAY_WINNINGS:
      return {
        ...state,
        funds: state.funds,
      };

    case actionTypes.RESET_GAME:
      return {
        ...initialState,
        deck: [],
        funds: 1000,
      };
    default:
      return initialState;
  }
};
export const GameContext = React.createContext(initialState);
