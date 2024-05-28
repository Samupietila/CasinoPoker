import React from "react";
import "./App.css";
import "./styles/styles.css";

import Card from "./components/Card";
import Navbar from "./components/Navbar";
import ControlButton from "./components/ControlButton.js";
import Table from "./components/Table.js";
import Player from "./components/Player.js";
import CardFaceDown from "./components/CardFaceDown";

import {
  generateDeck,
  shuffleDeck,
  dealHand,
  dealFlop,
  dealTurn,
  dealRiver,
  getDeckLength,
} from "./utils/deck.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <div className="game-container">
          <div className="dealer-container">
            <div className="card-slot">
              <CardFaceDown />
            </div>
            <div className="card-slot">
              <Card suit="♥" value="7" />
            </div>
          </div>
          <div className="table-container">
            <div className="card-slot"></div>
            <div className="card-slot"></div>
            <div className="card-slot"></div>
            <div className="card-slot"></div>
            <div className="card-slot"></div>
          </div>
          <div className="player-container">
            <div className="card-slot">
              <Card suit="♣" value="K" />
            </div>
            <div className="card-slot">
              <Card suit="♣" value="Q" />
            </div>
          </div>
        </div>
        <div className="control-container">
          <div className="deck">
            <CardFaceDown />
            <CardFaceDown />
            <CardFaceDown />
            <CardFaceDown />
          </div>
          <div className="info-container">
            <div className="info">
              <span className="info-label">Pot:</span>
              <span className="info-value">$0</span>
            </div>
            <div className="info">
              <span className="info-label">Current Bet:</span>
              <span className="info-value">$0</span>
            </div>
            <div className="info">
              <span className="info-label">Player Balance:</span>
              <span className="info-value">$1000</span>
            </div>
          </div>
          <div className="buttons-container">
            <ControlButton text="Deal" />
            <ControlButton text="Deal" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
