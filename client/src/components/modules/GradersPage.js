import React, { Component } from "react";

import "../pages/New-Game.css";
import { get, post } from "../../utilities.js";

// prop: game: the game object
class GraderPage extends Component {
  constructor(props) {
    super(props);
    this.state = { questionNum: 1, answerObjects: [] };
  }

  componentDidMount = () => {
    this.handleQuestionChange(1);
  };

  handleQuestionChange = (questionNum) => {
    if (questionNum < 1 || questionNum > this.props.game.questions.length) {
      alert("That's not a valid question number.");
      return;
    }
    get("/api/answers/", { gameCode: this.props.game.gameCode, questionNum: questionNum }).then(
      (results) => {
        console.log("found some results");
        console.log(results);
        this.setState({ questionNum: questionNum, answerObjects: results });
      }
    );
  };

  handleAnswerInput = () => {};

  render() {
    console.log(this.props.game.questions[this.state.questionNum - 1]);
    const theAnswers = this.props.game.questions[this.state.questionNum - 1].map(
      (singleQuestion, partNum) => (
        <div key={`displayQuestion-${partNum}`}>
          <h3> (Worth {this.props.game.points[this.state.questionNum - 1][partNum]} points) </h3>
          <h5> {singleQuestion} </h5>
          {this.state.answerObjects.map((answerObj, i) => (
            <div key={`answerObject-${partNum}-${i}`}>
              <h2> Answer by {answerObj.team} </h2>
              <p>{answerObj.content[partNum]}</p>
              <input
                className="small-text-box"
                type="number"
                onChange={(event) => this.handleAnswerInput(i, event.target.value)}
              />
            </div>
          ))}
        </div>
      )
    );
    console.log(theAnswers);
    return (
      <>
        <h1> {this.props.game.gameCode} </h1>
        Question Number:
        <input
          className="small-text-box"
          type="number"
          onChange={(event) => this.handleQuestionChange(event.target.value)}
        />
        <h1> Question {this.state.questionNum} </h1>
        {theAnswers}
        <div className="u-flex-justifyCenter top-margin">
          <span className="NewGame-button" onClick={this.handleSubmit}>
            <span className="button-text">Set Game </span>
          </span>
        </div>
      </>
    );
  }
}

export default GraderPage;
