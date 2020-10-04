import React, { useState } from "react";
import { Link } from "@reach/router";

const SignIn = ({ username, setUsername }) => {
  const [unInput, setInput] = useState("");
  const handleChange = ({ target: { value } }) => setInput(value);
  const handleSetUsername = () => {
    setUsername(unInput);
  };
  return (
    <div>
      <h3>Set your username</h3>
      <input type="text" onChange={handleChange} value={unInput} />
      <button onClick={handleSetUsername}>set username</button>
      {username !== "anon" && (
        <Link to="/game">
          <button>Join Game</button>
        </Link>
      )}
    </div>
  );
};

export default SignIn;
