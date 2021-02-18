import React, { Component } from "react";

import StudentLogin from "./Student-Login.js";
import QuestionPage from "./QuestionPage.js";
import { socket } from "../../client-socket";

import "../../utilities.css";
import { get, post } from "../../utilities.js";
import { navigate } from "@reach/router";

class StudentPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      game: "", // this is a game object
      teamName: "",
      teams: [],
      studentName: "",
      onQuestion: 0,
      done: false,
    };
  }

  submitGameCode = (code) => {
    console.log(code);
    get("/api/game-info", { gameCode: code }).then((results) => {
      console.log("got the game");
      this.setState({ game: results, teams: results.teams });
    });
  };

  submitTeamName = (teamName) => {
    this.setState({ teamName: teamName });
  };

  setTeamName = (teamName) => {
    this.setState({ teamName: teamName });
    console.log(teamName);
  };

  nextQuestion = () => {
    if (this.state.onQuestion + 1 === this.state.game.questions.length) {
      this.setState({ done: true });
      console.log("SETTING DONE TO TRUE");
    } else {
      this.setState({ onQuestion: this.state.onQuestion + 1 });
    }
  };

  render() {
    if (this.state.game === "" || this.state.teamName === "") {
      return (
        <>
          <StudentLogin
            submitGameCode={this.submitGameCode}
            submitTeamName={this.submitTeamName}
            teams={this.state.teams}
          />
        </>
      );
    }
    let i = this.state.onQuestion;
    if (this.state.done) {
      return <> You're done with the game! </>;
    }
    return (
      <QuestionPage
        gameCode={this.state.game.gameCode}
        name={this.state.game.name}
        questionNumber={1 + i}
        teamName={this.state.teamName}
        parts={this.state.game.parts[i]}
        questions={this.state.game.questions[i]}
        nextQuestionTime={this.state.game.times[i + 1]}
        time={this.state.game.times[i]}
        points={this.state.game.points[i]}
        password={this.state.game.questionPasswords[i]}
        nextQuestion={this.nextQuestion}
      />
    );
  }
}

export default StudentPages;
