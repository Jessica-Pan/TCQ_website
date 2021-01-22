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
      studentName: "",
      onQuestion: 0,
      done: false,
    };
  }

  onSubmit = (code, teamName) => {
    console.log(code);
    get("/api/game-info", { gameCode: code }).then((results) => {
      console.log("got the game");
      this.setState({ game: results, teamName: teamName });
    });
  };

  setTeamName = (teamName) => {
    this.setState({ teamName: teamName });
  };

  nextQuestion = () => {
    if (this.state.onQuestion + 1 === this.state.game.questions.length) {
      this.setState({ done: true });
      console.log("SETTING DONE TO TRUE");
    }
    this.setState({ onQuestion: this.state.onQuestion + 1 });
  };

  render() {
    if (this.state.game === "") {
      return (
        <>
          <StudentLogin onSubmit={this.onSubmit} />
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
        questionNumber={1 + i}
        teamName={this.state.teamName}
        parts={this.state.game.parts[i]}
        questions={this.state.game.questions[i]}
        time={this.state.game.times[i]}
        points={this.state.game.points[i]}
        password={this.state.game.questionPasswords[i]}
        nextQuestion={this.nextQuestion}
      />
    );
  }
}

export default StudentPages;
