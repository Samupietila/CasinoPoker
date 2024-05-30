import React from "react";
import { useState } from "react";

const InfoButton = ({ onClick }) => {
  return (
    <div className="button-info" onClick={onClick}>
      <span className="info-label">INFO</span>
    </div>
  );
};

const InfoPopUp = ({ trigger, setTrigger }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>Information</h1>
        <p>
          This is a simple application that allows you to create a list of
          tasks. You can add, delete, and mark tasks as completed. The tasks are
          stored in the local storage of your browser, so they will be saved
          even if you close the tab or the browser. You can also filter the
          tasks by their status (completed or pending) or by their name.
        </p>

        <button className="close-btn" onClick={() => setTrigger(false)}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export { InfoPopUp, InfoButton };
