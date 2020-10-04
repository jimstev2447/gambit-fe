import React from "react";

const DisplayVote = ({ votes }) => {
  const tally = Object.values(votes).reduce((tally, votee) => {
    if (tally[votee]) tally[votee]++;
    else tally[votee] = 1;
    return tally;
  }, {});
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {Object.entries(tally).map(([votee, votes]) => {
        return <li key={votee + votes}>{`${votee}: ${votes}`}</li>;
      })}
    </div>
  );
};

export default DisplayVote;
