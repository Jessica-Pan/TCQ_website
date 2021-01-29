import React, { Component } from "react";
import QuestionInput from "../modules/QuestionInput.js";
import "../../utilities.css";
import "./New-Game.css";
import "./LoginPages.css";

import { get, post } from "../../utilities.js";

class NewGame extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      numQuestions: 1,
      parts: [1],
      questions: [""],
      times: [0],
      points: [0],
      submitted: false,
      team: [],
    };
  }

  makePassword = (characters = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789") => {
    let result = "";
    const charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  handleSubmit = (event) => {
    console.log("SUBMIT");
    let adminPassword = this.makePassword();
    let questionPasswords = [];
    for (let i = 0; i < this.state.numQuestions; i++) {
      questionPasswords = questionPasswords.concat([this.makePassword()]);
    }
    let gameCode = this.makePassword("ABCDEFGHJKLMNPQRSTUVWXYZ");
    post("/api/new-game/", {
      gameCode: gameCode,
      parts: this.state.parts,
      questions: this.state.questions,
      times: this.state.times,
      points: this.state.points,
      questionPasswords: questionPasswords,
      adminPassword: adminPassword,
      teams: this.state.teams,
    });
    this.setState({ adminPassword, questionPasswords, gameCode, submitted: true });
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
      parts: new Array(numQuestions).fill(1),
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

  changeNumParts = (questionNum, numPart) => {
    let newParts = this.state.parts;
    newParts[questionNum - 1] = numPart;
    this.setState({
      parts: newParts,
    });
  };

  handleChangeTeams = (event) => {
    console.log(event.target.value);
    let teams = event.target.value.split("\n");
    console.log(teams);
    this.setState({ teams: teams });
  };

  render() {
    if (this.state.submitted) {
      return (
        <>
          You have made a new game! The code is {this.state.gameCode}. The admin password is{" "}
          {this.state.adminPassword}.
          <div> Here are all of the teams in this game: {this.state.teams.join(", ")} </div> Here
          are your questions and their passwords:
          {this.state.questions.map((question, i) => (
            <div key={`question-overview-${i}`}>
              <h2> Question {i + 1}: </h2>
              <p> Students get {this.state.times[i]} seconds to answer this question </p>
              <p> The password for this question is {this.state.questionPasswords[i]} </p>
              {question.map((singleQuestion, j) => (
                <div key={`question-${i}-part-${j}`}>
                  <h4> Part {j + 1}: </h4>
                  <p> Question: {singleQuestion} </p>
                  <p> This is worth {this.state.points[i][j]} points. </p>
                </div>
              ))}
            </div>
          ))}
        </>
      );
    }

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
          <span className="standard-text">Number of Questions:</span>
          <span className="New-Game-numQ-span">
            <input className="small-text-box" type="number" onChange={this.handleChangeNumQ} />
          </span>
        </div>
        <div>
          <span className="standard-text">Teams in this game (one per line): </span>
          <textarea className="large-text-box" onChange={this.handleChangeTeams} />
        </div>
        {questionInputs}
        <div className="u-flex-justifyCenter top-margin">
          <span className="NewGame-button" onClick={this.handleSubmit}>
            <span className="button-text">Set Game </span>
          </span>
        </div>
        {/* <div>
          <h1> Upload an image. </h1>
          <form action="/uploaded-image" method="post" enctype="multipart/form-data">
            <div>
              <label for="questionNum">Image Title</label>
              <input type="Number" id="name" placeholder="1" value="" name="questionNum" required />
            </div>
            <div>
              <label for="image">Upload Image</label>
              <input type="file" id="image" name="image" value="" required />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div> */}
      </>
    );
  }
}

export default NewGame;
