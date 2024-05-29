import React, { useState, useMemo, useReducer } from "react";
import "./App.css";
import "./styles/styles.css";
import { GameContext, gameReducer, initialState } from "./contexts/GameContext";

import Card from "./components/Card";
import Navbar from "./components/Navbar";
import ControlButton from "./components/ControlButton.js";
import CardFaceDown from "./components/CardFaceDown";
import Deck from "./components/Deck.js";
import Player from "./components/Player.js";
import Table from "./components/Table.js";
import InfoButton from "./components/InfoButton.js";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GameContext.Provider value={value}>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <div className="game-container">
            <div className="dealer-container">
              <div className="card-slot">
                {state.dealerHand[0] && (
                  <Card
                    suit={state.dealerHand[0].suit}
                    value={state.dealerHand[0].card}
                  />
                )}
              </div>
              <div className="card-slot">
                {state.dealerHand[1] && (
                  <Card
                    suit={state.dealerHand[1].suit}
                    value={state.dealerHand[1].card}
                  />
                )}
              </div>
            </div>
            <Table />
            <div className="player-container">
              <div className="card-slot">
                {state.playerHand[0] && (
                  <Card
                    suit={state.playerHand[0].suit}
                    value={state.playerHand[0].card}
                  />
                )}
              </div>
              <div className="card-slot">
                {state.playerHand[1] && (
                  <Card
                    suit={state.playerHand[1].suit}
                    value={state.playerHand[1].card}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="control-container">
            <Deck />
            <InfoButton />
            <Player
              potValue={state.potValue}
              betValue={state.betValue}
              funds={state.funds}
            />
            <div className="buttons-container">
              <ControlButton
                text={state.leftButton}
                actionType={state.leftButtonNextState}
              />
              {/* <ControlButton text={state.rightButton} actionType="ACTION_TYPE" /> */}
            </div>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default React.memo(App);
