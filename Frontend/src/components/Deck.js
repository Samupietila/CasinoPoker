import { useRef, createContext, useContext } from "react";
import React from "react";
import CardFaceDown from "./CardFaceDown";

export const DeckRefContext = createContext();

const Deck = React.forwardRef((props, ref) => {
  return (
    <DeckRefContext.Provider value={ref}>
      <div ref={ref} className="deck">
        <CardFaceDown />
        <CardFaceDown />
        <CardFaceDown />
        <CardFaceDown />
      </div>
    </DeckRefContext.Provider>
  );
});

export default Deck;
