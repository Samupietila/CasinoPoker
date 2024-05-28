import React from "react";
import "./App.css";
import "./styles/styles.css";

import Card from "./components/Card";
import Deck from "./components/Deck";
import Bet from "./components/Bet";
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
      <h1>React Poker</h1>
      <Card />
      <CardFaceDown />
    </div>
  );
}

export default App;
