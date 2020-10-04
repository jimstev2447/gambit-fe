import React from "react";

const GameLog = ({ gameLog }) => {
  return (
    <section className="gameLog">
      <h3>Game Log</h3>
      <ul className="gameLog--list">
        {gameLog.map((message, index) => {
          return <li key={message + index}>{message}</li>;
        })}
      </ul>
    </section>
  );
};

export default GameLog;
