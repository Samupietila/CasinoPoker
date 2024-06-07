import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { useDebounce } from "use-debounce";
import Info from "./Info";

const PlayerPopUp = ({ trigger, setTrigger, logs }) => {
  return (
    <>
      <div
        className={`backdrop ${trigger ? "show" : ""}`}
        onClick={() => setTrigger(false)}
      ></div>
      <div className={`popup ${trigger ? "show" : ""}`}>
        <div className="popup-inner">
          <div className="logger">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
          <div className="button-container" onClick={() => setTrigger(false)}>
            <div className="button-text">Close</div>
          </div>
        </div>
      </div>
    </>
  );
};

const Player = ({ onClick }) => {
  const { state } = useContext(GameContext);
  const [debouncePotValue] = useDebounce(state.potValue, 1000);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const log = Object.entries(state)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    setLogs((prevLogs) => [...prevLogs, log]);
  }, [state]);

  return (
    <div className="button-container" onClick={onClick}>
      PRESS THE BOX TO SEE LOGS
      <Info label="Pot:" value={debouncePotValue} animate={false} />
      <Info label="Current Bet:" value={state.betValue} animate={false} />
      <Info label="Bonus bet:" value={state.bonusBet} animate={false} />
      <Info label="Player Balance:" value={state.funds} />
    </div>
  );
};

export { Player, PlayerPopUp };
