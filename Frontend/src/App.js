import React, { useContext } from "react";
import "./App.css";
import "./styles/styles.css";
import { GameContext } from "./contexts/GameContext";

import Card from "./components/Card";
import Navbar from "./components/Navbar";
import ControlButton from "./components/ControlButton.js";
import CardFaceDown from "./components/CardFaceDown";
import Deck from "./components/Deck.js";
import Player from "./components/Player.js";
import Table from "./components/Table.js";
import InfoButton from "./components/InfoButton.js";

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
  const game = useContext(GameContext);
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
              <Card suit={game.deck} value={game.deck} />
            </div>
          </div>
          <Table />
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
          <Deck />
          <InfoButton />
          <Player
            potValue={game.potValue}
            betValue={game.betValue}
            funds={game.funds}
          />
          <div className="buttons-container">
            <ControlButton text={game.leftButton} />
            <ControlButton text={game.rightButton} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
