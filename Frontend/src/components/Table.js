import React, { useContext } from "react";
import Card from "./Card";
import { GameContext } from "../contexts/GameContext";

const Table = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="table-container">
      {/* first flop card */}
      <div className="card-slot">
        {state.flopCards[0] && (
          <Card
            suit={state.flopCards[0].suit}
            value={state.flopCards[0].card}
          />
        )}
      </div>

      {/* second flop card */}
      <div className="card-slot">
        {state.flopCards[1] && (
          <Card
            suit={state.flopCards[1].suit}
            value={state.flopCards[1].card}
          />
        )}
      </div>

      {/* third flop card */}
      <div className="card-slot">
        {state.flopCards[2] && (
          <Card
            suit={state.flopCards[2].suit}
            value={state.flopCards[2].card}
          />
        )}
      </div>

      {/* turn card */}
      <div className="card-slot">
        {state.turnCard[0] && (
          <Card suit={state.turnCard[0].suit} value={state.turnCard[0].card} />
        )}
      </div>

      {/* river card */}
      <div className="card-slot">
        {state.riverCard[0] && (
          <Card
            suit={state.riverCard[0].suit}
            value={state.riverCard[0].card}
          />
        )}
      </div>
    </div>
  );
};
export default Table;
