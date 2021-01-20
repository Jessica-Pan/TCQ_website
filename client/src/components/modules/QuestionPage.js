import React, { Component } from "react";

import StudentLogin from "./Student-Login.js";
import QuestionLogin from "./QuestionLogin.js";

import "../pages/New-Game.css";
import { get, post } from "../../utilities.js";

// PROPS:
//   gameCode: String,
//   questionNumber: number,
//   teamName: String
//   questions: [String],
//   time: Number,
//   points: [Number],
//   password: String
//   nextQuestion: a function that makes the game go to the next question
class QuestionPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      authorized: false,
      answers: new Array(this.props.questions.length).fill(""),
      time: this.props.time,
    };
  }

  decreaseTimer = () => {
    this.setState({ time: this.state.time - 1 });
  };

  loggedIn = () => {
    this.setState({ authorized: true });
    setInterval(this.decreaseTimer, 1000);
    post("/api/start-time/", {
      gameCode: this.props.gameCode,
      questionNum: this.props.questionNumber,
      teamName: this.props.teamName,
    });
  };

  handleAnswerChange = (partNum, newAnswer) => {
    let newAnswers = this.state.answers;
    newAnswers[partNum] = newAnswer;
    this.setState({
      answers: newAnswers,
    });
  };

  render() {
    if (this.state.authorized === false) {
      return (
        <>
          <QuestionLogin
            password={this.props.password}
            questionNum={this.props.questionNumber}
            time={this.state.time}
            onSuccess={this.loggedIn}
          />
        </>
      );
    }

    return (
      <>
        <h1> Question {this.props.questionNumber} </h1>
        <p> Time remaining: {this.state.time} </p>
        {this.props.questions.map((singleQuestion, i) => (
          <div key={`question-${i}`}>
            <h2> Part {i + 1} </h2>
            <p> {singleQuestion} </p>
            <p> (worth {this.props.points[i]} points) </p>
            <textarea
              rows="10"
              cols="80"
              className="large-text-box"
              onChange={(event) => this.handleAnswerChange(i, event.target.value)}
            />
          </div>
        ))}
      </>
    );
  }
}

export default QuestionPage;
