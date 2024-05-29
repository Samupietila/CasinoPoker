import React, { useEffect } from "react";
import * as Deck from "../utils/deck";
import { evaluateWinner } from "../utils/evaluateWinner";

//initial state of the game
const minBet = 10;

export const actionTypes = {
  START_GAME: "START_GAME",
  PLACE_BET: "PLACE_BET",
  DEAL_CARDS: "DEAL_CARDS",
  DEAL_FLOP: "DEAL_FLOP",
  DEAL_TURN: "DEAL_TURN",
  DEAL_RIVER: "DEAL_RIVER",
  CHECK_WINNER: "CHECK_WINNER",
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
  leftButtonNextState: actionTypes.DEAL_CARDS,
  rightButtonNextState: actionTypes.PLACE_BET,
  playerHand: [],
  dealerHand: [],
  tableCards: [],
  flopCards: [],
  turnCard: [],
  riverCard: [],
};

const getDeckLength = (deck) => {
  return console.log(deck.length);
};

export const gameReducer = (state, action) => {
  console.log(action);
  console.log("state changed", action);
  switch (action.type) {
    // PLACING A BET
    case actionTypes.PLACE_BET:
      console.log(state.betValue);
      const newBet = state.betValue + minBet;
      console.log(newBet);
      return {
        ...state,
        betValue: newBet,
      };

    // STARTING THE GAME
    // DEALING CARDS TO PLAYER AND DEALER
    case actionTypes.DEAL_CARDS:
      const deckDeal = Deck.generateDeck();
      Deck.shuffleDeck(deckDeal);
      getDeckLength(deckDeal);
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
        currentState: "STARTED",
      };

    // DEALING THE FLOP
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
        leftButtonNextState: actionTypes.DEAL_TURN,
      };

    // DEALING THE TURN
    case actionTypes.DEAL_TURN:
      const deckTurn = state.deck;
      const turnCard = Deck.dealTurn(deckTurn);
      console.log(turnCard);
      getDeckLength(deckTurn);

      return {
        ...state,
        deck: deckTurn,
        turnCard: turnCard,
        leftButton: "next is river",
        leftButtonNextState: actionTypes.DEAL_RIVER,
      };

    // DEALING THE RIVER
    case actionTypes.DEAL_RIVER:
      const deckRiver = state.deck;
      const riverCard = Deck.dealRiver(deckRiver);
      console.log(riverCard);
      getDeckLength(deckRiver);

      return {
        ...state,
        deck: deckRiver,
        riverCard: riverCard,
        leftButton: "next is showdown",
      };

    // CHECKING THE WINNER
    case actionTypes.CHECK_WINNER:

    default:
      return initialState;
  }
};
export const GameContext = React.createContext(initialState);
