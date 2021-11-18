import { useState, useRef, useEffect } from "react";

export default function useWordGame(defaultTimeValue = 5) {
  // TODO: Convert State to useReducer
  const [words, setWords] = useState("");
  const [time, setTime] = useState(defaultTimeValue);
  const [isGameOn, setIsGameOn] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [underlayText, setUnderlayText] = useState("");
  const textAreaRef = useRef(null);
  const underlayTexts = [
    "Let's get this one out of the way first. Coworking spaces have survived lockdown, with WeWork going public via a SPAC on October 21. WeWork has 56 locations across the UK and more than 250 in the US—including in department stores, though they're centered in big cities such as London and New York, as well as offices in Australia, South Africa, and beyond. An “all access” pass to a hot desk at multiple locations costs £299/$299 a month, though day passes are also available. There are other options for those who need extra flexibility. In New York, coworking spaces such as Bat Haus offer a few days a week or a set number of hours a month for half of what WeWork charges, while memberships at coworking networks such as Optix and Croissant can be budget ways of finding a desk where and when you need it.",
    "Simply put, blue light glasses are spectacles designed to filter out blue light from electronic devices – a part of the spectrum associated with irritation, eye fatigue and headaches. Almost all visible blue light rays are able to move through the cornea and lens of your eye to your retina – the area that transfers light information to our brain. Some experts believe that being exposed to too much of this high-energy light is harmful for the retina's light-sensitive cells. And some studies in animals also found other phototoxic retinal damage. ",
    "Zillow's Zestimate of home values has become a go-to reference for US homeowners. But when Zillow tried to use its algorithm to buy and sell homes, it badly misread the market. The company's iBuyer (or “instant buyer”) arm, where tech-first firms use algorithms to quickly value, buy, and sell homes, launched in 2018 in Phoenix. It joined a bustling market in the Arizona city: Opendoor, Redfin, and Offerpad have been buying and flipping homes there since around 2014. The principle behind iBuying is simple: Leveraging the power of big data, tech firms estimate the price at which they think they can sell a property, which then informs their offers to buy. They tend to offer lower prices than traditional buyers, but attract sellers by promising faster, all-cash deals.",
    "dementia diagnosis usually starts with a family member noticing that something isn't quite right: a partner becoming forgetful, a normally placid parent losing their temper more often. From there, there are doctor's appointments—memory and behavior tests that haven't changed in years, brain scans if the money is there, or one of the battery of new blood tests looking for the biomarkers of brain damage. And then: nothing. Neurodegenerative diseases like dementia and Alzheimer's are more feared than cancer and heart disease combined, according to a 2016 survey, and one of the most frightening things about them is how little we still know. There are no cures, and few effective treatments.",
    "Brazil, the world's largest coffee producer, was hit by a historic frost in July 2021. Temperatures in coffee fields dropped below zero and the beans became encased in ice. The cold snap came right after the worst drought the country had seen in almost a century, which had already weakened the coffee trees. As a result, the price of coffee has shot to a seven-year high in anticipation of a poor harvest next year. As a tropical crop that dislikes temperature variations and only grows in a narrow belt around the equator, coffee is extremely vulnerable to climate change. It is also contributing to it, because demand for coffee keeps rising worldwide, making it a key driver of deforestation. Add to the mix disease and pests, which have wiped out crops in many coffee growing regions, and it's easy to see why people are searching for alternative ways of growing coffee.",
  ];

  const startGame = () => {
    setIsGameOn(true);
    setTime(defaultTimeValue);
    pickRandomText();
    setWords("");
    setWordCount(0);
    textAreaRef.current.disabled = false;
    textAreaRef.current.focus();
    console.log(underlayText);
  };

  const endGame = () => {
    setWordCount(calculateWordCount(words));
  };

  const calculateWordCount = text => {
    const regex = /[^\w]/g;
    const stringArr = text.trim().split(regex);
    return stringArr.filter(word => word !== "").length;
  };

  const pickRandomText = () => {
    const randNum = Math.floor(Math.random() * underlayTexts.length) + 1;
    setUnderlayText(prevUnderlayText => {
      if (prevUnderlayText === underlayTexts[randNum]) {
        pickRandomText();
      } else {
        return underlayTexts[randNum];
      }
    });
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
    const { value } = e.target;

    const lastLetterIndex = value.length;
    const slicedUnderlyText = underlayText.slice(0, lastLetterIndex);
    if (value === slicedUnderlyText) {
      setWords(value);
    } else {
      setWords(prevWords => prevWords);
    }
  };

  return {
    textAreaRef,
    handleChange,
    isGameOn,
    words,
    time,
    startGame,
    wordCount,
    underlayText,
  };
}
