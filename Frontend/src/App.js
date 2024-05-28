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
        <h1>React Poker</h1>
        <Card suit="♣" value="K" />
        <CardFaceDown />
        <ControlButton />
      </div>
    </div>
  );
}

export default App;
