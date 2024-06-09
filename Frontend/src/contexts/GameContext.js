import React from "react";
import * as Deck from "../utils/deck";
import {
  evaluateWinner,
  isBonusBetWin,
  isBonusBet2Win,
  getPrintByHandRank,
  getBestHand,
} from "../utils/evaluateWinner";

// initial variables for the game
const minBet = 4;

// action types for the game
export const actionTypes = {
  START_GAME: "START_GAME",
  PLACE_BET: "PLACE_BET",
  PLACE_BONUS_BET: "PLACE_BONUS_BET",
  PLACE_BONUS_BET2: "PLACE_BONUS_BET2",

  DEAL_CARDS: "DEAL_CARDS",
  DEAL_FLOP: "DEAL_FLOP",
  DEAL_TURN: "DEAL_TURN",
  DEAL_RIVER: "DEAL_RIVER",

  CHECK_WINNER: "CHECK_WINNER",
  FOLD: "FOLD",

  CHECK_FLOP: "CHECK_FLOP",
  CHECK_TURN: "CHECK_TURN",

  UPDATE_FUNDS: "UPDATE_FUNDS",
  RESET_GAME: "RESET_GAME",
  NEW_GAME: "NEW_GAME",
  NEW_GAME_SAME_BET: "NEW_GAME_SAME_BET",

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
  bonusBet2: 0,
  potValue: 0,
  betValue: minBet,

  // buttons for the game
  firstButton: "Start",
  secondButton: "Bet",
  thirdButton: "Bonus",
  currentState: "NOT_STARTED",
  firstButtonNextState: actionTypes.DEAL_CARDS,
  secondButtonNextState: actionTypes.PLACE_BET,
  thirdButtonNextState: actionTypes.PLACE_BONUS_BET,
  fourthButtonNextState: actionTypes.PLACE_BONUS_BET2,
  firstButtonViewState: true,
  secondButtonViewState: true,
  thirdButtonViewState: true,
  fourthButtonViewState: true,
  checkState: false,

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
  winnerPrint: "",
};

const getMaxBet = (funds) => {
  const fifthOfFunds = funds / 5;
  let maxBet = minBet;
  while (maxBet + minBet <= fifthOfFunds && maxBet + minBet <= 20) {
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

const getMaxBonusBet2 = (funds, betValue) => {
  const bonusBet = funds - betValue;
  if (bonusBet > 5) {
    return 5;
  }
  return bonusBet;
};

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
      return {
        ...state,
        deck: deckDeal,
        potValue: potValue,
        firstButton: "Flop",
        secondButton: "Fold",
        thirdButton: "disabled",
        playerHand: playerHand,
        dealerHand: dealerHand,
        firstButtonNextState: actionTypes.DEAL_FLOP,
        secondButtonNextState: actionTypes.FOLD,
        thirdButtonViewState: false,
        currentState: "STARTED",
      };

    // DEALING THE FLOP
    case actionTypes.DEAL_FLOP:
      let flopLog = "";
      const deckFlop = state.deck;
      const flopCards = Deck.dealFlop(deckFlop);
      const potValueFlop = state.potValue + state.originalBet * 2;
      const bonusWinnings = isBonusBetWin(state.playerHand);
      const updatedFunds =
        state.funds + bonusWinnings * state.bonusBet - state.bonusBet;

      if (bonusWinnings > 0) {
        flopLog = `Player wins ${
          bonusWinnings * state.bonusBet
        }$ with bonus bet. Players funds are now ${updatedFunds}$`;
      } else if (state.bonusBet === 0) {
        flopLog = `Bonus bet not played`;
      } else {
        flopLog = `Player loses ${state.bonusBet}$. Players funds are now ${updatedFunds}$`;
      }
      if (updatedFunds < potValueFlop + state.originalBet) {
        return {
          ...state,
          winnerPrint: flopLog,
          funds: updatedFunds,
          deck: deckFlop,
          potValue: potValueFlop,
          flopCards: flopCards,
          firstButtonViewState: false,
          secondButtonViewState: false,
          thirdButton: "Check",
          thirdButtonNextState: actionTypes.CHECK_FLOP,
          thirdButtonViewState: true,
          currentState: "FLOP",
        };
      }
      return {
        ...state,
        winnerPrint: flopLog,
        funds: updatedFunds,
        deck: deckFlop,
        potValue: potValueFlop,
        flopCards: flopCards,
        firstButton: "Raise",
        firstButtonNextState: actionTypes.DEAL_TURN,
        secondButtonViewState: false,
        thirdButton: "Check",
        thirdButtonNextState: actionTypes.CHECK_FLOP,
        thirdButtonViewState: true,
        currentState: "FLOP",
      };

    // DEALING THE TURN
    case actionTypes.DEAL_TURN:
      const deckTurn = state.deck;
      const turnCard = Deck.dealTurn(deckTurn);
      const potValueTurn = state.potValue + state.originalBet;
      if (state.checkState === true) {
        return {
          ...state,
          turnCard: turnCard,

          currentState: "CHECK_TURN",
        };
      } else if (state.funds < potValueTurn + state.originalBet) {
        return {
          ...state,
          deck: deckTurn,
          turnCard: turnCard,
          potValue: potValueTurn,
          firstButtonViewState: false,
          firstButton: "THIS SHOULD BE HIDDEN",
          thirdButtonNextState: actionTypes.CHECK_TURN,
          currentState: "TURN",
        };
      }
      return {
        ...state,
        deck: deckTurn,
        turnCard: turnCard,
        potValue: potValueTurn,
        firstButtonNextState: actionTypes.DEAL_RIVER,
        thirdButtonNextState: actionTypes.CHECK_TURN,
        currentState: "TURN",
      };

    // DEALING THE RIVER
    case actionTypes.DEAL_RIVER:
      const deckRiver = state.deck;
      const riverCard = Deck.dealRiver(deckRiver);

      const potValueRiver = state.potValue + state.originalBet;
      // sleep 3 seconds before checking the winner.
      return {
        ...state,
        deck: deckRiver,
        potValue: potValueRiver,
        riverCard: riverCard,
        currentState: "RIVER",
        firstButtonViewState: false,
        thirdButtonViewState: false,
        firstButtonNextState: actionTypes.CHECK_WINNER,
        checkState: false,
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
      const bonusWinnings2 = isBonusBet2Win(endPlayerHand, tableCards);
      const winner = evaluateWinner(endPlayerHand, endDealerHand, tableCards);
      return {
        ...state,
        playerHand: endPlayerHand,
        dealerHand: endDealerHand,
        firstButton: winner,
        winner: winner,
        firstButtonViewState: false,
        currentState: "WINNER",
        tableCards: tableCards,
      };

    // UDPATING FUNDS
    case actionTypes.UPDATE_FUNDS:
      if (state.winner === 1) {
        const phr = getBestHand(state.playerHand, state.tableCards).rank;
        const log = `Player wins ${state.potValue}$  with ${getPrintByHandRank(
          phr
        )}. Players funds are now ${state.funds + state.potValue}$`;
        return {
          ...state,
          winnerPrint: log,
          funds: state.funds + state.potValue,
          potValue: 0,
          firstButton: "NewBet",
          secondButton: "SameBet",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
          firstButtonViewState: true,
          secondButtonViewState: true,
        };
      } else if (state.winner === 0) {
        const dhr = getBestHand(state.dealerHand, state.tableCards).rank;
        const log = `Its a tie! Both players have ${getPrintByHandRank(
          dhr
        )}. Players funds are now ${state.funds}$`;
        return {
          ...state,
          winnerPrint: log,
          funds: state.funds,
          potValue: 0,
          firstButton: "NewBet",
          secondButton: "SameBet",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
          firstButtonViewState: true,
          secondButtonViewState: true,
        };
      } else if (state.winner === 3) {
        const log = `Player folded and lost ${
          state.potValue + state.bonusBet
        }$. Players funds are now ${state.funds - state.potValue}$`;
        return {
          ...state,
          winnerPrint: log,
          funds: state.funds - state.potValue,
          potValue: 0,
          firstButton: "NewBet",
          secondButton: "SameBet",
          firstButtonNextState: actionTypes.NEW_GAME,
          secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
          firstButtonViewState: true,
          secondButtonViewState: true,
        };
      }
      const dhr = getBestHand(state.dealerHand, state.tableCards).rank;
      const log = `Dealer wins with ${getPrintByHandRank(dhr)}. Player loses ${
        state.potValue
      }$. Players funds are now ${state.funds - state.potValue}$`;
      return {
        ...state,
        winnerPrint: log,
        funds: state.funds - state.potValue,
        potValue: 0,
        firstButton: "NewBet",
        secondButton: "SameBet",
        firstButtonNextState: actionTypes.NEW_GAME,
        secondButtonNextState: actionTypes.NEW_GAME_SAME_BET,
        firstButtonViewState: true,
        secondButtonViewState: true,
      };

    // New Game
    case actionTypes.NEW_GAME:
      return {
        ...state,
        winnerPrint: "",
        deck: [],
        funds: state.funds,
        maxBet: getMaxBet(state.funds),
        originalBet: minBet,
        potValue: 0,
        betValue: minBet,
        bonusBet: 0,
        firstButton: "Start",
        secondButton: "Bet",
        thirdButton: "Bonus",
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
        winnerPrint: "",
        funds: state.funds,
        maxBet: getMaxBet(state.funds),
        originalBet: state.betValue,
        potValue: state.betValue,
        betValue: state.betValue,
        firstButton: "Flop",
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

    // FOLDING
    case actionTypes.FOLD:
      const extractBonusFunds = state.funds - state.bonusBet;
      return {
        ...state,
        funds: extractBonusFunds,
        winner: 3,
        currentState: "FOLD",
      };

    // CHECKING
    case actionTypes.CHECK_FLOP:
      return {
        ...state,
        checkState: true,
        currentState: "CHECK_FLOP",
        firstButtonViewState: false,
        thirdButtonViewState: false,
        secondButtonViewState: false,
        potValue: state.potValue - state.originalBet,
      };

    case actionTypes.CHECK_TURN:
      return {
        ...state,
        checkState: true,
        currentState: "CHECK_TURN",
        firstButtonViewState: false,
        thirdButtonViewState: false,
        secondButtonViewState: false,
        potValue: state.potValue - state.originalBet,
      };

    // TURNING CARDS
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
