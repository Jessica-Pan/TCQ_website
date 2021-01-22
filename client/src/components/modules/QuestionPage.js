import React, { Component } from "react";

import QuestionLogin from "./QuestionLogin.js";

import "../pages/New-Game.css";
import { socket } from "../../client-socket.js";
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

    socket.on(`updateText:${this.props.teamName}:${this.props.gameCode}`, (newAns) => {
      this.setState({
        answers: newAns,
      });
      console.log("the new socket answers: " + newAns);
    });
  }

  decreaseTimer = () => {
    console.log("timer:");
    console.log(this.state.time);
    if (this.state.time === 0) {
      this.handleOutOfTime();
    }
    this.setState({ time: this.state.time - 1 });
  };

  handleOutOfTime = () => {
    clearInterval(this.state.timer);
    console.log(
      "I'm posting this as the answer to question " +
        this.props.questionNumber +
        " for team " +
        this.props.teamName
    );
    console.log(this.state.answers);
    post("/api/student-answers/", {
      gameCode: this.props.gameCode,
      questionNum: this.props.questionNumber,
      teamName: this.props.teamName,
      content: this.state.answers,
    });
    this.props.nextQuestion();
    this.setState({ authorized: false, time: this.props.time });
  };

  loggedIn = () => {
    this.setState({ authorized: true, timer: setInterval(this.decreaseTimer, 1000) });
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
    console.log("I'm posting to the socket the answer: " + newAnswers);
    post("/api/textbox-update", {
      gameCode: this.props.gameCode,
      newAns: newAnswers,
      teamName: this.props.teamName,
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
              value={this.state.answers[i]}
              onChange={(event) => this.handleAnswerChange(i, event.target.value)}
            />
          </div>
        ))}
      </>
    );
  }
}

export default QuestionPage;
