import React from "react";

const Player = (props) => {
  return (
    <div>
      <div className="funds">
        <h2>{props.funds}</h2>
      </div>
      <div className="player">
        <h2>{props.username}</h2>
      </div>
      <div className="buttons">
        <button>sth</button>
        <button>sth</button>
      </div>
    </div>
  );
};
export default Player;
