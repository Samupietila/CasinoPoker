import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import CardFaceDown from "./CardFaceDown";
import { DeckRefContext } from "./Deck";

const Card = (props) => {
  const { suit, value, isFaceUp, className } = props;
  const isRed = suit === "♥" || suit === "♦";
  const cardValueRef = useRef(null);
  const cardSuitRef = useRef(null);
  const deckRef = useContext(DeckRefContext);
  const [deckPosition, setDeckPosition] = useState({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (deckRef.current) {
      const rect = deckRef.current.getBoundingClientRect();
      setDeckPosition({ left: rect.left, top: rect.top });
    }
  }, [deckRef]);

  useEffect(() => {
    const resizeFont = () => {
      [cardValueRef.current, cardSuitRef.current].forEach((element) => {
        if (element) {
          let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
          while (
            element.scrollHeight > element.offsetHeight ||
            element.scrollWidth > element.offsetWidth
          ) {
            fontSize--;
            element.style.fontSize = fontSize + "px";
          }
        }
      });
    };

    window.addEventListener("resize", resizeFont);
    resizeFont();

    return () => {
      window.removeEventListener("resize", resizeFont);
    };
  }, [isFaceUp]);

  return (
    <div
      className={`card-flip ${isFaceUp ? "flipped" : ""} ${className}`}
      style={{
        "--animation-from-x": `${deckPosition.left}px`,
        "--animation-from-y": `${deckPosition.top}px`,
      }}
    >
      <div>
        <div className="back">
          <CardFaceDown />
        </div>
        <div className="front">
          <div className="card-container">
            <div
              ref={cardValueRef}
              className={`card-value ${isRed ? "red-text" : ""}`}
            >
              {value}
            </div>
            <div
              ref={cardSuitRef}
              className={`card-suit ${isRed ? "red-text" : ""}`}
            >
              {suit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
