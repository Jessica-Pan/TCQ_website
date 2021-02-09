import React, { Component } from "react";
import QuestionInput from "./QuestionInput.js";
import "../../utilities.css";
import "../pages/New-Game.css";
import "../pages/LoginPages.css";

import { get, post } from "../../utilities.js";

class EditGamePage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      numQuestions: this.props.game.questions.length,
      parts: this.props.game.questions.map((question) => question.length),
      questions: this.props.game.questions,
      times: this.props.game.times,
      points: this.props.game.points,
      submitted: false,
      teams: this.props.game.teams,
      images: [],
      gameCode: this.props.game.gameCode,
    };
  }

  //   componentDidMount() {
  //     this.setState({
  //       numQuestions: this.props.game.questions.length,
  //       parts: this.props.game.questions.map((question) => question.length),
  //       questions: this.props.game.questions,
  //       times: this.props.game.times,
  //       points: this.props.game.points,
  //       submitted: false,
  //       teams: this.props.game.teams,
  //       images: [],
  //       gameCode: this.props.game.gameCode,
  //     });
  //   }

  //   makePassword = (characters = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789") => {
  //     let result = "";
  //     const charactersLength = characters.length;
  //     for (var i = 0; i < 6; i++) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     return result;
  //   };

  handleSubmit = (event) => {
    console.log("SUBMIT");
    if (this.state.teams.length === 0) {
      alert("Input the teams that will be in this game");
      return;
    }
    // let adminPassword = this.makePassword();
    // let questionPasswords = [];
    // for (let i = 0; i < this.state.numQuestions; i++) {
    //   questionPasswords = questionPasswords.concat([this.makePassword()]);
    // }
    post("/api/update-game/", {
      gameCode: this.state.gameCode,
      parts: this.state.parts,
      questions: this.state.questions,
      times: this.state.times,
      points: this.state.points,
      teams: this.state.teams,
    });
    this.setState({
      adminPassword,
      questionPasswords,
      gameCode: this.state.gameCode,
      submitted: true,
    });
  };

  handleChangeNumQ = (event) => {
    let numQuestions = parseInt(event.target.value);
    if (isNaN(numQuestions)) {
      numQuestions = 1;
    }
    let numToAdd = numQuestions - this.state.questions.length;
    if (numToAdd > 0) {
      this.setState({
        numQuestions: numQuestions,
        questions: this.state.questions.concat(new Array(numToAdd).fill("")),
        times: this.state.times.concat(new Array(numToAdd).fill(0)),
        points: this.state.points.concat(new Array(numToAdd).fill(0)),
        parts: this.state.parts.concat(new Array(numToAdd).fill(1)),
      });
    } else if (numToAdd < 0) {
      this.setState({
        numQuestions: numQuestions,
        questions: this.state.questions.slice(0, numQuestions),
        times: this.state.times.slice(0, numQuestions),
        points: this.state.points.slice(0, numQuestions),
        parts: this.state.parts.slice(0, numQuestions),
      });
    }
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
    // console.log(event.target.value);
    let teams = event.target.value.split("\n");
    // console.log(teams);
    this.setState({ teams: teams });
  };

  // enteredImage = (image, questionNum) => {
  //   let images = this.state.images;
  //   images.push([image, questionNum]);
  //   this.setState({ images: images });
  // };

  render() {
    if (this.state.submitted) {
      return (
        <>
          You have updated the game! The code is {this.state.gameCode}. The admin password is{" "}
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
        gameCode={this.state.gameCode}
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
            <input
              className="small-text-box"
              value={this.state.numQuestions}
              type="number"
              onChange={this.handleChangeNumQ}
            />
          </span>
        </div>
        <div>
          <span className="standard-text">Teams in this game (one per line): </span>
          <textarea
            className="large-text-box"
            value={this.state.teams.join("\n")}
            onChange={this.handleChangeTeams}
          />
        </div>
        <hr />
        {questionInputs}
        <hr />
        <div className="u-flex-justifyCenter top-margin">
          <span className="NewGame-button" onClick={this.handleSubmit}>
            <span className="button-text">Set Game </span>
          </span>
        </div>
      </>
    );
  }
}

export default EditGamePage;
