import { useState, useRef, useEffect } from "react";

export default function useWordGame(defaultTimeValue = 10) {
  const [words, setWords] = useState("");
  const [time, setTime] = useState(defaultTimeValue);
  const [isGameOn, setIsGameOn] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textAreaRef = useRef(null);

  const startGame = () => {
    setIsGameOn(true);
    setTime(defaultTimeValue);
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

  return {
    textAreaRef,
    handleChange,
    isGameOn,
    words,
    time,
    startGame,
    wordCount,
  };
}
