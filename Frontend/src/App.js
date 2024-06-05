import React, { useState, useCallback, useReducer, useRef } from "react";
import "./App.css";
import "./styles/styles.css";
import { GameContext, gameReducer, initialState } from "./contexts/GameContext";
import Navbar from "./components/Navbar";
import ControlButton from "./components/ControlButton.js";
import Deck from "./components/Deck.js";
import Player from "./components/Player.js";
import PlayerHand from "./components/PlayerHand.js";
import DealerHand from "./components/DealerHand.js";
import Table from "./components/Table.js";
import { InfoPopUp, InfoButton } from "./components/InfoButton.js";
import Game from "./components/Game.js";
import { DeckRefContext } from "./components/Deck";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const memoizedDispatch = useCallback(dispatch, []);
  const [showPopup, setShowPopup] = useState(false);
  const deckRef = useRef(null);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <GameContext.Provider value={{ state, dispatch: memoizedDispatch }}>
      <DeckRefContext.Provider value={deckRef}>
        {" "}
        {/* provide the ref here */}
        <Game />
        <div className="App">
          <Navbar />
          <div className="main-container">
            <div className="game-container">
              <DealerHand />
              <Table />
              <PlayerHand />
              <InfoPopUp trigger={showPopup} setTrigger={setShowPopup} />
            </div>
            <div className="control-container">
              <Deck ref={deckRef} /> {/* pass the ref to Deck */}
              <InfoButton onClick={handleClick} />
              <Player />
              <div className="buttons-container">
                <ControlButton
                  text={state.firstButton}
                  actionType={state.firstButtonNextState}
                  state={state.firstButtonViewState}
                />
                <ControlButton
                  text={state.secondButton}
                  actionType={state.secondButtonNextState}
                  state={state.secondButtonViewState}
                />
              </div>
              <div className="buttons-container">
                <ControlButton
                  text={state.thirdButton}
                  actionType={state.thirdButtonNextState}
                  state={state.thirdButtonViewState}
                />
              </div>
            </div>
          </div>
        </div>
      </DeckRefContext.Provider>
    </GameContext.Provider>
  );
}

export default React.memo(App);
