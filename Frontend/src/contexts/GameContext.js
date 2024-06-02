import React from "react";
import * as Deck from "../utils/deck";
import { evaluateWinner } from "../utils/evaluateWinner";

// initial variables for the game
const minBet = 4;

// action types for the game
export const actionTypes = {
  START_GAME: "START_GAME",
  PLACE_BET: "PLACE_BET",
  DEAL_CARDS: "DEAL_CARDS",
  DEAL_FLOP: "DEAL_FLOP",
  DEAL_TURN: "DEAL_TURN",
  DEAL_RIVER: "DEAL_RIVER",
  CHECK_WINNER: "CHECK_WINNER",
  FOLD: "FOLD",
  CHECK: "CHECK",
  UPDATE_FUNDS: "UPDATE_FUNDS",
  RESET_GAME: "RESET_GAME",
  NEW_GAME: "NEW_GAME",
  NEW_GAME_SAME_BET: "NEW_GAME_SAME_BET",
  INVALID_BET: "INVALID_BET",
};

// initial state of the game
export const initialState = {
  // info for the game
  deck: [],
  funds: 100,
  maxBet: 100 / 3,
  originalBet: minBet,
  potValue: 0,
  betValue: minBet,

  // buttons for the game
  firstButton: "Start Game",
  secondButton: "Bet",
  thirdButton: "Fold",
  currentState: "NOT_STARTED",
  firstButtonNextState: actionTypes.DEAL_CARDS,
  secondButtonNextState: actionTypes.PLACE_BET,
  thirdButtonNextState: actionTypes.FOLD,

  // cards for the game
  playerHand: [],
  playerHandState: "True",
  dealerHand: [],
  dealerHandState: "False",
  tableCards: [],
  flopCards: [],
  turnCard: [],
  riverCard: [],

  // winner of the game
  winner: "",
};

const getDeckLength = (deck) => {
  return console.log(deck.length);
};

const getMaxBet = (funds) => {
  const thirdOfFunds = funds / 5;
  let maxBet = minBet;
  while (maxBet + minBet <= thirdOfFunds) {
    maxBet += minBet;
  }
  return maxBet;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const gameReducer = (state, action) => {
  // variables for the game

  switch (action.type) {
    // switch case variables for the game

    // PLACING A BET
    case actionTypes.PLACE_BET:
      const maxBet = getMaxBet(state.funds);
      const newBet = state.betValue + minBet;
      if (newBet > maxBet) {
        return { ...state, betValue: state.maxBet, secondButton: "MaxBet" };
      }
      return {
        ...state,
        betValue: newBet,
        originalBet: newBet,
        maxBet: maxBet,
        currentState: "BETTING",
      };

    // STARTING THE GAME
    // DEALING CARDS TO PLAYER AND DEALER
    case actionTypes.DEAL_CARDS:
      const deckDeal = Deck.generateDeck();
      Deck.shuffleDeck(deckDeal);
      getDeckLength(deckDeal);
      const playerHand = Deck.dealHand(deckDeal, 2);

      const dealerHand = Deck.dealHand(deckDeal, 2);

      const potValue = state.betValue;

      getDeckLength(deckDeal);
      return {
        ...state,
        deck: deckDeal,
        potValue: potValue,
        firstButton: "Flop (2x bet)",
        secondButton: "Check",
        thirdButton: "Fold",
        playerHand: playerHand,
        dealerHand: dealerHand,
        firstButtonNextState: actionTypes.DEAL_FLOP,
        secondButtonNextState: actionTypes.CHECK,
        thirdButtonNextState: actionTypes.FOLD,
        currentState: "STARTED",
      };

    // DEALING THE FLOP
    case actionTypes.DEAL_FLOP:
      const deckFlop = state.deck;
      const flopCards = Deck.dealFlop(deckFlop);
      getDeckLength(deckFlop);
      const potValueFlop = state.potValue + state.originalBet * 2;
      return {
        ...state,
        deck: deckFlop,
        potValue: potValueFlop,
        flopCards: flopCards,
        firstButton: "Raise (1x bet)",
        firstButtonNextState: actionTypes.DEAL_TURN,
      };

    // DEALING THE TURN
    case actionTypes.DEAL_TURN:
      const deckTurn = state.deck;
      const turnCard = Deck.dealTurn(deckTurn);
      getDeckLength(deckTurn);
      const potValueTurn = state.potValue + state.originalBet;
      return {
        ...state,
        deck: deckTurn,
        turnCard: turnCard,
        potValue: potValueTurn,
        firstButton: "next is river",
        firstButtonNextState: actionTypes.DEAL_RIVER,
      };

    // DEALING THE RIVER
    case actionTypes.DEAL_RIVER:
      console.log("DEALING RIVER");
      const deckRiver = state.deck;
      const riverCard = Deck.dealRiver(deckRiver);
      getDeckLength(deckRiver);
      const potValueRiver = state.potValue + state.originalBet;
      // sleep 3 seconds before checking the winner.
      return {
        ...state,
        dealerHandState: "True",
        deck: deckRiver,
        potValue: potValueRiver,
        riverCard: riverCard,
        firstButton: "next is showdown",
        currentState: "RIVER",
        firstButtonNextState: actionTypes.CHECK_WINNER,
      };

    // CHECKING THE WINNER
    case actionTypes.CHECK_WINNER:
      const endPlayerHand = state.playerHand;
      const endDealerHand = state.dealerHand;
      const tableCards = state.tableCards.concat(
        state.flopCards,
        state.turnCard,
        state.riverCard
      );
      const winner = evaluateWinner(endPlayerHand, endDealerHand, tableCards);
      return {
        ...state,
        playerHand: endPlayerHand,
        dealerHand: endDealerHand,
        firstButton: winner,
        winner: winner,
        firstButtonNextState: actionTypes.UPDATE_FUNDS,
        currentState: "WINNER",
      };

    // UDPATING FUNDS
    case actionTypes.UPDATE_FUNDS:
      if (state.winner === 1) {
        return {
          ...state,
          funds: state.funds + state.potValue,
          potValue: 0,
          firstButton: "You Won",
          secondButton: "Play Again",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
        };
      }
      if (state.winner === 0) {
        return {
          ...state,
          funds: state.funds,
          potValue: 0,
          firstButton: "You Tied",
          secondButton: "Play Again",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
        };
      }
      return {
        ...state,
        funds: state.funds - state.potValue,
        potValue: 0,
        firstButton: "You Lost",
        secondButton: "Play Again",
        firstButtonNextState: actionTypes.NEW_GAME,
        secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
      };

    // New Game
    case actionTypes.NEW_GAME:
      return {
        ...state,
        deck: [],
        funds: state.funds,
        maxBet: getMaxBet(state.funds),
        originalBet: minBet,
        potValue: 0,
        betValue: minBet,
        firstButton: "Start Game",
        secondButton: "Bet",
        currentState: "NOT_STARTED",
        firstButtonNextState: actionTypes.DEAL_CARDS,
        secondButtonNextState: actionTypes.PLACE_BET,
        playerHand: [],
        dealerHand: [],
        dealerHandState: "False",
        tableCards: [],
        flopCards: [],
        turnCard: [],
        riverCard: [],
        winner: "",
      };

    // New Game with same bet
    case actionTypes.NEW_GAME_SAME_BET:
      return {
        ...state,
        funds: state.funds,
        maxBet: getMaxBet(state.funds),
        originalBet: state.betValue,
        potValue: state.betValue,
        betValue: state.betValue,
        firstButton: "Flop (2x bet)",
        secondButton: "Fold",
        currentState: "NEW_GAME_SAME_BET",
        playerHand: [],
        dealerHand: [],
        dealerHandState: "False",
        tableCards: [],
        flopCards: [],
        turnCard: [],
        riverCard: [],
        winner: "",
      };

    // CHECKING
    case actionTypes.CHECK:
      switch (state.firstButtonNextState) {
        case actionTypes.DEAL_FLOP:
          return {
            ...state,
            currentState: "STARTED",
          };
        case actionTypes.DEAL_TURN:
          const deckTurn = state.deck;
          const turnCard = Deck.dealTurn(deckTurn);
          return {
            ...state,
            deck: deckTurn,
            turnCard: turnCard,
            firstButton: "CHECKED",
            firstButtonNextState: actionTypes.DEAL_RIVER,
            currentState: "CHECK",
          };
        case actionTypes.DEAL_RIVER:
          console.log("CHECKING RIVER");
          const deckRiver = state.deck;
          const riverCard = Deck.dealRiver(deckRiver);
          return {
            ...state,
            deck: deckRiver,
            riverCard: riverCard,
            firstButton: "CHECKED",
            dealerHandState: "True",
            firstButtonNextState: actionTypes.CHECK_WINNER,
            currentState: "RIVER",
          };
        default:
          return {
            ...state,
            currentState: "CHECK",
          };
      }
      return {
        ...state,
        currentState: "CHECK",
      };

    // FOLDING
    case actionTypes.FOLD:
      return {
        ...state,
        winner: "",
        currentState: "FOLD",
      };

    default:
      return initialState;
  }
};
export const GameContext = React.createContext(initialState);
