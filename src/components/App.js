import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <h1 className="game__title">Speed Typing App</h1>
        <textarea className="game__text" />
        <h4 className="game__timer">Time remaining:</h4>
        <button className="game__btn">Start</button>
        <h2 className="game__word-count">Word Count:</h2>
      </div>
    );
  }
}

export default App;
