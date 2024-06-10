import React, { useState, useCallback, useReducer, useEffect } from "react";
import "./App.css";
import "./styles/styles.css";
import { GameContext, gameReducer, initialState } from "./contexts/GameContext";
import Navbar from "./components/Navbar";
import ControlButton from "./components/ControlButton.js";
import Deck from "./components/Deck.js";
import { Player, PlayerPopUp } from "./components/Player.js";
import PlayerHand from "./components/PlayerHand.js";
import DealerHand from "./components/DealerHand.js";
import Table from "./components/Table.js";
import { InfoPopUp, InfoButton } from "./components/InfoButton.js";
import Game from "./components/Game.js";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const memoizedDispatch = useCallback(dispatch, []);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogger, setShowLogger] = useState(false);
  const [logs, setLogs] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  const updateLogs = (newLog, state) => {
    if (state) {
      const log = `${newLog}: ${JSON.stringify(state.winnerPrint)}`;
      setLogs((prevLogs) => [...prevLogs, log]);
    }
  };

  useEffect(() => {
    if (state.winnerPrint) {
      setClickCount((prevCount) => prevCount + 1);
      updateLogs(`LOG ${clickCount}`, state);
    }
  }, [state.winnerPrint]);

  return (
    <GameContext.Provider value={{ state, dispatch: memoizedDispatch }}>
      <Game />
      <div className="App">
        <Navbar />
        <div className="main-container">
          <div className="game-container">
            <DealerHand />
            <Table />
            <PlayerHand />
            <InfoPopUp trigger={showPopup} setTrigger={setShowPopup} />
            <PlayerPopUp
              trigger={showLogger}
              setTrigger={setShowLogger}
              logs={logs}
            />
          </div>
          <div className="control-container">
            <InfoButton onClick={handleClick} />
            <Player
              onClick={() => {
                setShowLogger(!showLogger);
              }}
            />
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
              <ControlButton
                text={state.fourthButton}
                actionType={state.fourthButtonNextState}
                state={state.fourthButtonViewState}
              />
            </div>
            <div className="buttons-container">
              <ControlButton
                text={state.fifthButton}
                actionType={state.fifthButtonNextState}
                state={state.fifthButtonViewState}
              />
            </div>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default React.memo(App);
