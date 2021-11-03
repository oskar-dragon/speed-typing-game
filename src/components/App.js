import React, { useEffect, useState } from "react";

export default function App() {
  const [words, setWords] = useState("");
  const [time, setTime] = useState(15);
  const [isGameOn, setIsGameOn] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (time > 0 && isGameOn) {
      setTimeout(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsGameOn(false);
    }

    if (time === 0 && !isGameOn) {
      setWordCount(calculateWordCount(words));
    }
  }, [time, isGameOn]);

  const handleChange = e => {
    setWords(e.target.value);
  };

  const handleClick = () => {
    setIsGameOn(prevState => !prevState);
  };

  const calculateWordCount = text => {
    const regex = /[^\w]/g;
    const stringArr = text.trim().split(regex);
    return stringArr.filter(word => word !== "").length;
  };

  return (
    <div className="container">
      <h1 className="game__title">Speed Typing App</h1>
      <textarea onChange={handleChange} value={words} className="game__text" />
      <h4 className="game__timer">Time remaining: {time}</h4>
      <button onClick={handleClick} className="game__btn">
        {isGameOn ? "Stop" : "Start"}
      </button>
      <h2 className="game__word-count">Word Count: {wordCount}</h2>
    </div>
  );
}
