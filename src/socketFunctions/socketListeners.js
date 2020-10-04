exports.applyListeners = (
  socket,
  { setUsers, setLog, setGameAvailable, username, setGameState }
) => {
  socket.on("connect", () => {
    socket.emit("new-user", { username });
  });
  socket.on("user-update", (data) => {
    console.log(data);
    setUsers(data.users);
  });
  socket.on("game-log", ({ message }) => {
    setLog((prevLog) => [...prevLog, message]);
  });
  socket.on("game-available", ({ gameAvailable }) => {
    console.log(`game available: ${gameAvailable}`);
    setGameAvailable(gameAvailable);
  });

  socket.on("game-update", ({ game }) => {
    console.log("updating game");
    setGameState(game);
  });
};
