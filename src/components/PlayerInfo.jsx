import React from "react";

const PlayerInfo = ({ players, username, setVote, userVote }) => {
  const [{ name, role, id }] = players.filter(({ name }) => name === username);

  return (
    <section>
      <h3>Crew Information</h3>
      <p>you are {name}</p>
      <p>you are the {role}</p>
      <p>you work for the {id}</p>
      {players.map(({ name, role, health }, index) => {
        let healthInfo = "";
        const handleVote = () => {
          setVote(name);
        };
        if (health === 0) healthInfo = "dead";
        else if (health === 1) healthInfo = "injured";
        else healthInfo = "Healthy";
        return (
          <li key={name + index + "crewCard"}>
            <h4>{name === username ? "you" : name}</h4>
            <p>{role}</p>
            <p>{healthInfo}</p>
            {userVote === name && <p>you have voted for this passenger</p>}
            <button onClick={handleVote}>vote</button>
          </li>
        );
      })}
    </section>
  );
};

export default PlayerInfo;
