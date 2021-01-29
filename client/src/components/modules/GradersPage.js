import React, { Component } from "react";
import { Link } from "@reach/router";

import "../pages/New-Game.css";
import { get, post } from "../../utilities.js";
import { socket } from "../../client-socket.js";

// prop: game: the game object
class GraderPage extends Component {
  constructor(props) {
    super(props);
    this.state = { questionNum: 1, answerObjects: [], grades: [] };
    console.log("HERE" + `grades${this.props.game.gameCode}`);
    socket.on(`grades${this.props.game.gameCode}`, (results) => {
      console.log("HERE 1");
      console.log(results);
      console.log(results.questionNum);
      if (results.questionNum === this.state.questionNum) {
        console.log("HERE 2");
        let objectsArray = [...this.state.answerObjects];
        console.log(objectsArray);
        let relevantAnswer = this.state.answerObjects.filter((answer) => {
          return answer.team === results.teamName;
        })[0];
        let relevantIndex = this.state.answerObjects.indexOf(relevantAnswer);
        relevantAnswer.grade = results.newGrades;
        objectsArray[relevantIndex] = relevantAnswer;
        console.log(relevantAnswer);
        console.log(objectsArray);
        let grades = [...this.state.grades];
        grades[relevantIndex] = results.newGrades;

        this.setState({ answerObjects: objectsArray, grades: grades });
      }
    });
  }

  componentDidMount = () => {
    this.handleQuestionChange(1);
  };

  handleQuestionChange = (questionNum) => {
    if (questionNum < 1 || questionNum > this.props.game.questions.length) {
      alert("That's not a valid question number.");
      return;
    }
    this.setState({ grades: [] });
    get("/api/answers/", { gameCode: this.props.game.gameCode, questionNum: questionNum }).then(
      (results) => {
        console.log("found some results");
        console.log(results);
        let grades = results.map((answer) => {
          if (answer.grade.length === 0) {
            return new Array(this.props.game.questions[questionNum - 1].length).fill("Not graded");
          }
          return answer.grade;
        });
        console.log("Here are the grades I found:");
        console.log(grades);
        this.setState({ questionNum: questionNum, answerObjects: results, grades: grades });
      }
    );
  };

  handleAnswerInput = (answer, grade, i, partNum) => {
    if (grade < 0 && grade > this.props.game.points[i][partNum]) {
      alert("That is not a valid score. The max is " + this.props.game.points[i][partNum]);
      return;
    }
    console.log(
      `read in a grade of ${grade} for part ${partNum} for the answer for team ${answer.team}`
    );
    // gameCode, questionNum, partNum, teamName, grade
    post("/api/grades/", {
      gameCode: answer.gameCode,
      questionNum: answer.questionNumber,
      teamName: answer.team,
      partNum: partNum,
      grade: grade,
      numParts: this.props.game.questions[answer.questionNumber - 1].length,
    });
    let newGrades = this.state.grades;
    newGrades[i][partNum] = grade;
    this.setState({ grades: newGrades });
  };

  render() {
    console.log(this.props.game.questions[this.state.questionNum - 1]);
    console.log(this.state.answerObjects);
    const theAnswers = this.props.game.questions[this.state.questionNum - 1].map(
      (singleQuestion, partNum) => (
        <div key={`displayQuestion-${partNum}`}>
          <h1> Part {partNum + 1} </h1>
          <h3> (Worth {this.props.game.points[this.state.questionNum - 1][partNum]} points) </h3>
          <h5> {singleQuestion} </h5>
          {this.state.answerObjects.map((answerObj, i) => (
            <div key={`answerObject-${partNum}-${i}`}>
              {/* <h2> Answer: </h2> */}
              <h2> Answer by {answerObj.team} </h2>
              <p>{answerObj.content[partNum]}</p>
              <p>
                Current grade:{" "}
                {this.state.grades[i][partNum] === -1
                  ? "Not graded"
                  : this.state.grades[i][partNum]}
              </p>
              <input
                className="small-text-box"
                type="number"
                onChange={(event) =>
                  this.handleAnswerInput(answerObj, event.target.value, i, partNum)
                }
              />
            </div>
          ))}
        </div>
      )
    );
    console.log(theAnswers);
    return (
      <>
        <h1>
          {this.props.game.gameCode}: Question {this.state.questionNum}
        </h1>
        Question Number:
        <input
          className="small-text-box"
          type="number"
          value={this.state.questionNum}
          onChange={(event) => this.handleQuestionChange(event.target.value)}
        />
        {theAnswers}
        <div className="u-flex-justifyCenter top-margin">
          <span className="NewGame-button" onClick={this.handleSubmit}>
            <Link className="button-text" to="/">
              Done
            </Link>
          </span>
        </div>
      </>
    );
  }
}

export default GraderPage;
