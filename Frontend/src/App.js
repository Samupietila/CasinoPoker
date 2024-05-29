import React, { useCallback, useReducer } from "react";
import "./App.css";
import "./styles/styles.css";
import {
  GameContext,
  actionTypes,
  gameReducer,
  initialState,
} from "./contexts/GameContext";
import Navbar from "./components/Navbar";
import ControlButtonRight from "./components/ControlButtonRight.js";
import ControlButtonLeft from "./components/ControlButtonLeft.js";
import CardFaceDown from "./components/CardFaceDown";
import Deck from "./components/Deck.js";
import Player from "./components/Player.js";
import PlayerHand from "./components/PlayerHand.js";
import DealerHand from "./components/DealerHand.js";
import Table from "./components/Table.js";
import InfoButton from "./components/InfoButton.js";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const memoizedDispatch = useCallback(dispatch, []);

  return (
    <GameContext.Provider value={{ state, dispatch: memoizedDispatch }}>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <div className="game-container">
            <DealerHand />
            <Table />
            <PlayerHand />
          </div>
          <div className="control-container">
            <Deck />
            <InfoButton />
            <Player />
            <div className="buttons-container">
              <ControlButtonLeft
                text={state.leftButton}
                actionType={state.leftButtonNextState}
              />
              <ControlButtonRight
                text={state.rightButton}
                actionType={
                  state.currentState === "NOT_STARTED"
                    ? actionTypes.PLACE_BET
                    : actionTypes.RESET_GAME
                }
              />
            </div>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default React.memo(App);
