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
    let gameCode = this.makePassword("ABCDEFGHJKLMNPQRSTUVWXYZ");
    this.state = {
      numQuestions: 1,
      parts: [1],
      questions: [""],
      times: [0],
      points: [0],
      submitted: false,
      teams: [],
      images: [],
      gameCode: gameCode,
      name: "Round 1",
    };
  }

  componentDidMount() {
    this.checkUniqueGameCode();
  }

  checkUniqueGameCode = () => {
    get("/game-info", { gameCode: this.state.gameCode }).then((results) => {
      if (results !== null) {
        const newGameCode = this.makePassword("ABCDEFGHJKLMNPQRSTUVWXYZ");
        this.setState({ gameCode: newGameCode });
      }
    });
  };

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
    if (this.state.teams.length === 0) {
      alert("Input the teams that will be in this game");
      return;
    }
    let adminPassword = this.makePassword();
    let questionPasswords = [];
    for (let i = 0; i < this.state.numQuestions; i++) {
      questionPasswords = questionPasswords.concat([this.makePassword()]);
    }
    post("/api/new-game/", {
      gameCode: this.state.gameCode,
      name: this.state.name,
      parts: this.state.parts,
      questions: this.state.questions,
      times: this.state.times,
      points: this.state.points,
      questionPasswords: questionPasswords,
      adminPassword: adminPassword,
      teams: this.state.teams,
    });
    // IMAGE UPLOAD
    // for (let i = 0; i < this.state.images.length; i++) {
    //   const relevant = this.state.images[i];
    //   console.log(relevant);
    //   post("/upload-image", {
    //     image: relevant[0],
    //     questionNum: relevant[1],
    //     gameCode: gameCode,
    //   });
    // }
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

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  // enteredImage = (image, questionNum) => {
  //   let images = this.state.images;
  //   images.push([image, questionNum]);
  //   this.setState({ images: images });
  // };

  download = (data, filename, type) => {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  downloadAsTxt = () => {
    let data = `You have made a new game: ${this.state.name}!\nThe code is: ${
      this.state.gameCode
    } \nThe admin password is: ${
      this.state.adminPassword
    } \nHere are all of the teams in this game: \n${this.state.teams.join(
      ", "
    )} \nHere are your questions and their passwords:`;
    for (let i = 0; i < this.state.questions.length; i++) {
      const question = this.state.questions[i];
      data += `\nQuestion ${String.fromCharCode(i + "A".charCodeAt(0))} \n\nStudents get ${
        this.state.times[i]
      } seconds to answer this question \nThe password for this question is ${
        this.state.questionPasswords[i]
      } \n
      `;
      for (let j = 0; j < question.length; j++) {
        data += ` Part ${j + 1}: \nQuestion: ${question[j]} \nThis is worth ${
          this.state.points[i][j]
        } points. \n`;
      }
    }
    this.download(data, `${this.state.name}-${this.state.gameCode}-info.txt`, "txt");
  };

  render() {
    if (this.state.submitted) {
      return (
        <>
          You have made a new game!
          <h1> {this.state.name} </h1>
          <p> The code is: {this.state.gameCode} </p>{" "}
          <p>The admin password is: {this.state.adminPassword} </p>
          <div> Here are all of the teams in this game: {this.state.teams.join(", ")} </div> Here
          are your questions and their passwords:
          {this.state.questions.map((question, i) => (
            <div key={`question-overview-${i}`}>
              <h2> Question {String.fromCharCode(i + "A".charCodeAt(0))}: </h2>
              <p> Students get {this.state.times[i]} seconds to answer this question </p>
              <p> The password for this question is {this.state.questionPasswords[i]} </p>
              {question.map((singleQuestion, j) => (
                <div key={`question-${i}-part-${j}`}>
                  <h4> Part {i + 1}: </h4>
                  <p> Question: {singleQuestion} </p>
                  <p> This is worth {this.state.points[i][j]} points. </p>
                </div>
              ))}
            </div>
          ))}
          <button onClick={this.downloadAsTxt}> Download as a .txt file </button>
        </>
      );
    }

    let questionInputs = [...Array(this.state.numQuestions).keys()].map((num, i) => (
      <QuestionInput
        key={`question-input-${i}`}
        id={num + 1}
        numParts={1}
        questions={[""]}
        points={[0]}
        gameCode={this.state.gameCode}
        time={this.state.times[i]}
        changeTime={this.changeTime}
        changeQuestion={this.changeQuestion}
        changePoints={this.changePoints}
      />
    ));
    return (
      <>
        <h1 className="header"> New Game </h1>
        <div className="u-flex-justifyCenter">
          <input
            className="small-text-box"
            type="text"
            value={this.state.name}
            onChange={this.handleChangeName}
          />
        </div>
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

export default NewGame;
