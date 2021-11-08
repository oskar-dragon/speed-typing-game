import React, { useEffect, useState, useRef } from "react";
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
  } = useWordGame();

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
