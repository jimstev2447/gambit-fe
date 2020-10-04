import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";
import SignIn from "./components/SignIn";
import { Router } from "@reach/router";

function App() {
  const [username, setUsername] = useState("anon");

  return (
    <div className="App">
      <Header />
      <p>welcome {username}</p>
      <main>
        <Router className="gameView">
          <SignIn path="/" username={username} setUsername={setUsername} />
          <Game path="/game" username={username} />
        </Router>
      </main>
    </div>
  );
}

export default App;
