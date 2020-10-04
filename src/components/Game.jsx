import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { applyListeners } from "../socketFunctions/socketListeners";
import { Link } from "@reach/router";
import PlayerInfo from "./PlayerInfo";
import GameLog from "./GameLog";
import UserList from "./UserList";
import DisplayVote from "./DisplayVote";

const server_url = "http://localhost:9090";

const Game = ({ username }) => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [gameLog, setLog] = useState([]);
  const [isGameAvailable, setGameAvailable] = useState(false);
  const [userReady, setReady] = useState(false);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    console.log("making the socket");
    setSocket(io(server_url));
  }, []);

  useEffect(() => {
    if (!socket) return;
    applyListeners(socket, {
      setUsers,
      setLog,
      setGameAvailable,
      username,
      setGameState,
    });
  }, [socket, username]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("user-ready", { isReady: userReady });
  }, [userReady, socket]);
  const handleLeave = () => {
    socket.disconnect();
  };

  const handleReady = () => {
    setReady(!userReady);
  };
  const handleGameStart = () => {
    socket.emit("new-game");
  };
  const setVote = (votee) => {
    socket.emit("user-vote", { voter: username, votee });
  };
  const handleVent = () => {
    const [infectedPlayer] = gameState.players.filter(
      ({ infected }) => infected
    );
    console.log(`${infectedPlayer.name}`);
  };
  console.log(("game obj", gameState));
  let isCaptain = false;
  let allVoted = false;
  if (gameState) {
    isCaptain =
      gameState.players.filter(({ role }) => role === "captain")[0].name ===
      username;
    allVoted = gameState.playerCount === gameState.voteCount;
  }
  return (
    <>
      <p>{userReady ? "waiting for others..." : "Are you ready?"}</p>
      <button onClick={handleReady}>Ready?</button>
      {isGameAvailable && <button onClick={handleGameStart}>Start Game</button>}
      <Link to="/">
        <button onClick={handleLeave}>Leave Game</button>
      </Link>
      {gameState && (
        <>
          {isCaptain && allVoted && (
            <button onClick={handleVent}>Vent a Human</button>
          )}
          <DisplayVote votes={gameState.votes} />
          <PlayerInfo
            players={gameState.players}
            username={username}
            userVote={gameState.votes[username]}
            setVote={setVote}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <UserList users={users} />
        <GameLog gameLog={gameLog} />
      </div>
    </>
  );
};

export default Game;
