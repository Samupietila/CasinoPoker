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
            isFaceUp={state.flopCardsState}
          />
        )}
      </div>

      {/* second flop card */}
      <div className="card-slot">
        {state.flopCards[1] && (
          <Card
            suit={state.flopCards[1].suit}
            value={state.flopCards[1].card}
            isFaceUp={state.flopCardsState}
          />
        )}
      </div>

      {/* third flop card */}
      <div className="card-slot">
        {state.flopCards[2] && (
          <Card
            suit={state.flopCards[2].suit}
            value={state.flopCards[2].card}
            isFaceUp={state.flopCardsState}
          />
        )}
      </div>

      {/* turn card */}
      <div className="card-slot">
        {state.turnCard[0] && (
          <Card
            suit={state.turnCard[0].suit}
            value={state.turnCard[0].card}
            isFaceUp={state.turnCardState}
          />
        )}
      </div>

      {/* river card */}
      <div className="card-slot">
        {state.riverCard[0] && (
          <Card
            suit={state.riverCard[0].suit}
            value={state.riverCard[0].card}
            isFaceUp={state.riverCardState}
          />
        )}
      </div>
    </div>
  );
};
export default Table;
