import React, { useEffect, useRef } from "react";
import CardFaceDown from "./CardFaceDown";

const Card = (props) => {
  const { suit, value, isFaceUp } = props;
  const isRed = suit === "♥" || suit === "♦";
  const cardValueRef = useRef(null);
  const cardSuitRef = useRef(null);

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
    <>
      {isFaceUp ? (
        <>
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
        </>
      ) : (
        <CardFaceDown />
      )}
    </>
  );
};

export default Card;
