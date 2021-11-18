import React from "react";
import useWordGame from "../hooks/useWordGame";

export default function App() {
  const {
    textAreaRef,
    handleChange,
    isGameOn,
    words,
    time,
    startGame,
    wordCount,
    underlayText,
  } = useWordGame();

  return (
    <div className="container">
      <h1 className="game__title">Speed Typing App</h1>
      <div className="game__text">
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          disabled={!isGameOn}
          value={words}
          className="game__text-overlay"
        />
        <textarea
          disabled
          value={underlayText}
          className="game__text-underlay"
        />
      </div>
      <h4 className="game__timer">Time remaining: {time}</h4>
      <button onClick={startGame} disabled={isGameOn} className="game__btn">
        Start
      </button>
      <h2 className="game__word-count">Word Count: {wordCount}</h2>
    </div>
  );
}
