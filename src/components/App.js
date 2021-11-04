import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const STARTING_TIME = 5;

  const [words, setWords] = useState("");
  const [time, setTime] = useState(STARTING_TIME);
  const [isGameOn, setIsGameOn] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textAreaRef = useRef(null);

  const startGame = () => {
    setIsGameOn(true);
    setTime(STARTING_TIME);
    setWords("");
    setWordCount(0);
    textAreaRef.current.disabled = false;
    textAreaRef.current.focus();
  };

  const endGame = () => {
    setWordCount(calculateWordCount(words));
  };

  const calculateWordCount = text => {
    const regex = /[^\w]/g;
    const stringArr = text.trim().split(regex);
    return stringArr.filter(word => word !== "").length;
  };

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
      endGame();
    }
  }, [time, isGameOn]);

  const handleChange = e => {
    setWords(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="game__title">Speed Typing App</h1>
      <textarea
        ref={textAreaRef}
        onChange={handleChange}
        disabled={!isGameOn}
        value={words}
        className="game__text"
      />
      <h4 className="game__timer">Time remaining: {time}</h4>
      <button onClick={startGame} disabled={isGameOn} className="game__btn">
        Start
      </button>
      <h2 className="game__word-count">Word Count: {wordCount}</h2>
    </div>
  );
}
