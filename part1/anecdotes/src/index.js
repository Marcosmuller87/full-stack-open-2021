import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const mostVotes = Math.max(...votes);
  const mostVoted = anecdotes[votes.indexOf(mostVotes)];

  const handleRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    return setSelected(random);
  };

  const handleVote = () => {
    const newArr = [...votes];
    newArr[selected] += 1;
    setVotes(newArr);
  };

  return (
    <>
      <h2>Anecdote of the Day</h2>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleRandom} text="Next Anecdote" />
      <h2>Anecdote with most Votes</h2>
      <div>{mostVoted}</div>
      <div>Has {mostVotes} votes</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
