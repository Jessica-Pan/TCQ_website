import React, { Component } from "react";
import QuestionInput from "../modules/QuestionInput.js";
import "../../utilities.css";
import "./New-Game.css";
import "./LoginPages.css";

class NewGame extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      numQuestions: 1,
      password: "asdfasdf",
      questions: [],
      times: [],
      points: [],
    };
  }

  handleClick = (event) => {
    console.log("SUBMIT");
    console.log("QUESTIONS:");
    console.log(this.state.questions);
    console.log("TIMES:");
    console.log(this.state.times);
    console.log("POINTS:");
    console.log(this.state.points);
  };

  handleChangeNumQ = (event) => {
    let numQuestions = parseInt(event.target.value);
    if (isNaN(numQuestions)) {
      numQuestions = 1;
    }
    this.setState({
      numQuestions: numQuestions,
      questions: new Array(numQuestions).fill(""),
      times: new Array(numQuestions).fill(0),
      points: new Array(numQuestions).fill(0),
    });
  };

  changeQuestion = (questionNum, newQuestion) => {
    let newQuestions = this.state.questions;
    newQuestions[questionNum - 1] = newQuestion;
    this.setState({
      questions: newQuestions,
    });
  };

  changeTime = (questionNum, newTime) => {
    console.log(newTime);
    let newTimes = this.state.times;
    newTimes[questionNum - 1] = newTime;
    this.setState({
      times: newTimes,
    });
  };

  changePoints = (questionNum, newPoint) => {
    let newPoints = this.state.points;
    newPoints[questionNum - 1] = newPoint;
    this.setState({
      points: newPoints,
    });
  };

  render() {
    console.log(this.state.numQuestions);
    let questionInputs = [...Array(this.state.numQuestions).keys()].map((num, i) => (
      <QuestionInput
        key={`question-input-${i}`}
        id={num + 1}
        changeTime={this.changeTime}
        changeQuestion={this.changeQuestion}
        changePoints={this.changePoints}
      />
    ));
    return (
      <>
        <h1 className="header"> New Game </h1>
        <div className="New-Game-numQ">
          <text className="standard-text">Number of Questions:</text>
          <span className="New-Game-numQ-span">
            <input className="small-text-box" type="number" onChange={this.handleChangeNumQ} />
          </span>
        </div>
        {questionInputs}
        <div className="u-flex-justifyCenter top-margin">
          <span className="NewGame-button" onClick={this.handleClick}>
            <text className="button-text">Set Game </text>
          </span>
        </div>
      </>
    );
  }
}

export default NewGame;
