import React from "react";
import "./App.css";

import Card from "./components/Card";
import Deck from "./components/Deck";
import Bet from "./components/Bet";
import Table from "./components/Table.js";
import Player from "./components/Player.js";

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
      <h1>Poker</h1>
      <Card />
      <Deck />
      <Bet />
      <Player />
    </div>
  );
}

export default App;
