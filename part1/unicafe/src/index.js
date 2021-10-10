import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handle, text }) => {
  return <button onClick={handle}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No Feedback Given</p>;
  } else
    return (
      <table>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic text="Average" value={(good - bad) / all} />
        <Statistic text="Positives" value={(good / all) * 100} />
      </table>
    );
};

const Statistic = ({ text, value }) => {
  if (text === "Positives") {
    return (
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}%</td>
        </tr>
      </tbody>
    );
  } else
    return (
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <>
      <h2>Give Feedback</h2>
      <Button handle={handleClickGood} text="Good" />
      <Button handle={handleClickNeutral} text="Neutral" />
      <Button handle={handleClickBad} text="Bad" />
      <h2>Statistics</h2>
      <Statistics bad={bad} neutral={neutral} good={good} all={all} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
