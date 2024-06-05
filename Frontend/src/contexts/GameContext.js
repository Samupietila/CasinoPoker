import React from "react";
import * as Deck from "../utils/deck";
import { evaluateWinner, isBonusBetWin } from "../utils/evaluateWinner";

// initial variables for the game
const minBet = 4;

// action types for the game
export const actionTypes = {
  START_GAME: "START_GAME",
  PLACE_BET: "PLACE_BET",
  PLACE_BONUS_BET: "PLACE_BONUS_BET",
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
  SET_PLAYER_HAND_STATE: "SET_PLAYER_HAND_STATE",
  SET_DEALER_HAND_STATE: "SET_DEALER_HAND_STATE",
  SET_FLOP_CARDS_STATE: "SET_FLOP_CARDS_STATE",
  SET_TURN_CARD_STATE: "SET_TURN_CARD_STATE",
  SET_RIVER_CARD_STATE: "SET_RIVER_CARD_STATE",
};

// initial state of the game
export const initialState = {
  // info for the game
  deck: [],
  funds: 100,
  maxBet: 0,
  originalBet: minBet,
  bonusBet: 0,
  potValue: 0,
  betValue: minBet,

  // buttons for the game
  firstButton: "Start Game",
  secondButton: "Bet",
  thirdButton: "Bonus Bet",
  currentState: "NOT_STARTED",
  firstButtonNextState: actionTypes.DEAL_CARDS,
  secondButtonNextState: actionTypes.PLACE_BET,
  thirdButtonNextState: actionTypes.PLACE_BONUS_BET,
  firstButtonViewState: true,
  secondButtonViewState: true,
  thirdButtonViewState: true,

  // cards for the game
  playerHand: [],
  playerHandState: false,
  dealerHand: [],
  dealerHandState: false,
  tableCards: [],
  flopCards: [],
  flopCardsState: false,
  turnCard: [],
  turnCardState: false,
  riverCard: [],
  riverCardState: false,

  // winner of the game
  winner: "",
};

const getDeckLength = (deck) => {
  return console.log(deck.length);
};

const getMaxBet = (funds) => {
  const thirdOfFunds = funds / 5;
  let maxBet = minBet;
  while (maxBet + minBet <= thirdOfFunds && maxBet + minBet <= 20) {
    maxBet += minBet;
  }
  return maxBet;
};
const getMaxBonusBet = (funds, betValue) => {
  const bonusBet = funds - betValue;
  if (bonusBet > 5) {
    return 5;
  }
  return bonusBet;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const gameReducer = (state, action) => {
  switch (action.type) {
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
    // PLACING A BONUS BET
    case actionTypes.PLACE_BONUS_BET:
      const bonusBet = state.bonusBet + 1;
      const maxBonusBet = getMaxBonusBet(state.funds, state.betValue);
      if (bonusBet > maxBonusBet) {
        return { ...state, bonusBet: maxBonusBet, thirdButton: "MaxBet" };
      }
      return {
        ...state,
        bonusBet: bonusBet,
        currentState: "BETTING",
      };

    // STARTING THE GAME
    // DEALING CARDS TO PLAYER AND DEALER
    case actionTypes.DEAL_CARDS:
      const deckDeal = Deck.generateDeck();
      Deck.shuffleDeck(deckDeal);
      const playerHand = Deck.dealHand(deckDeal, 2);
      const dealerHand = Deck.dealHand(deckDeal, 2);
      const potValue = state.betValue;
      const bonusWinnings = isBonusBetWin(playerHand);
      const updatedFunds = state.funds + bonusWinnings - state.bonusBet;
      return {
        ...state,
        funds: updatedFunds,
        deck: deckDeal,
        potValue: potValue,
        firstButton: "Flop (2x bet)",
        secondButton: "Fold",
        thirdButton: "disabled",
        playerHand: playerHand,
        dealerHand: dealerHand,
        firstButtonNextState: actionTypes.DEAL_FLOP,
        secondButtonNextState: actionTypes.FOLD,
        secondButtonViewState: true,
        thirdButtonNextState: actionTypes.FOLD,
        thirdButtonViewState: false,
        currentState: "STARTED",
      };

    // DEALING THE FLOP
    case actionTypes.DEAL_FLOP:
      const deckFlop = state.deck;
      const flopCards = Deck.dealFlop(deckFlop);

      const potValueFlop = state.potValue + state.originalBet * 2;
      return {
        ...state,
        deck: deckFlop,
        potValue: potValueFlop,
        flopCards: flopCards,
        firstButton: "Raise (1x bet)",
        firstButtonNextState: actionTypes.DEAL_TURN,
        thirdButton: "Check",
        thirdButtonNextState: actionTypes.CHECK,
        thirdButtonViewState: true,
        currentState: "FLOP",
      };

    // DEALING THE TURN
    case actionTypes.DEAL_TURN:
      const deckTurn = state.deck;
      const turnCard = Deck.dealTurn(deckTurn);

      const potValueTurn = state.potValue + state.originalBet;
      return {
        ...state,
        deck: deckTurn,
        turnCard: turnCard,
        potValue: potValueTurn,
        firstButtonNextState: actionTypes.DEAL_RIVER,
        currentState: "TURN",
      };

    // DEALING THE RIVER
    case actionTypes.DEAL_RIVER:
      console.log("DEALING RIVER");
      const deckRiver = state.deck;
      const riverCard = Deck.dealRiver(deckRiver);

      const potValueRiver = state.potValue + state.originalBet;
      // sleep 3 seconds before checking the winner.
      return {
        ...state,
        deck: deckRiver,
        potValue: potValueRiver,
        riverCard: riverCard,
        firstButton: "next is showdown",
        currentState: "RIVER",
        thirdButtonViewState: false,
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
      console.log("WINNER: ", winner);
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
          firstButton: "NewBet",
          secondButton: "SameBet",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
        };
      }
      if (state.winner === 0) {
        return {
          ...state,
          funds: state.funds,
          potValue: 0,
          firstButton: "NewBet",
          secondButton: "SameBet",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
        };
      }
      return {
        ...state,
        funds: state.funds - state.potValue,
        potValue: 0,
        firstButton: "NewBet",
        secondButton: "SameBet",
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
        bonusBet: 0,
        firstButton: "Start Game",
        secondButton: "Bet",
        thirdButton: "Bonus Bet",
        currentState: "NOT_STARTED",
        firstButtonNextState: actionTypes.DEAL_CARDS,
        secondButtonNextState: actionTypes.PLACE_BET,
        thirdButtonNextState: actionTypes.PLACE_BONUS_BET,
        thirdButtonViewState: true,
        playerHand: [],
        dealerHand: [],
        dealerHandState: false,
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
        dealerHandState: false,
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
            dealerHandState: true,
            firstButtonNextState: actionTypes.CHECK_WINNER,
            currentState: "RIVER",
          };
        default:
          return {
            ...state,
            currentState: "CHECK",
          };
      }

    // FOLDING
    case actionTypes.FOLD:
      return {
        ...state,
        winner: "",
        currentState: "FOLD",
      };

    case actionTypes.SET_PLAYER_HAND_STATE:
      return {
        ...state,
        playerHandState: action.payload,
      };

    case actionTypes.SET_DEALER_HAND_STATE:
      return {
        ...state,
        dealerHandState: action.payload,
      };

    case actionTypes.SET_FLOP_CARDS_STATE:
      return {
        ...state,
        flopCardsState: action.payload,
      };

    case actionTypes.SET_TURN_CARD_STATE:
      return {
        ...state,
        turnCardState: action.payload,
      };

    case actionTypes.SET_RIVER_CARD_STATE:
      return {
        ...state,
        riverCardState: action.payload,
      };

    default:
      return initialState;
  }
};
export const GameContext = React.createContext(initialState);
