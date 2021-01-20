import React, { Component } from "react";

import StudentLogin from "./Student-Login.js";

import { get, post } from "../../utilities.js";

class StudentPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      game: "", // this is a game object
      teamName: "",
      studentName: "",
    };
  }

  onSubmit = (code, teamName) => {
    console.log(code);
    get("/api/game-for-students", { gameCode: code }).then((results) => {
      console.log("got the game");
      this.setState({ game: results[0], teamName: teamName });
    });
  };

  setTeamName = (teamName) => {
    this.setState({ teamName: teamName });
  };

  render() {
    if (this.state.game === "") {
      return (
        <>
          <StudentLogin onSubmit={this.onSubmit} />
        </>
      );
    }
    console.log("Here's the game: ");
    console.log(this.state.game);
    return (
      <>
        Your name: {this.state.teamName}
        Game code: {this.state.game.gameCode} Questions: {this.state.game.questions}, you get{" "}
        {this.state.game.times} seconds, worth {this.state.game.points} points.
      </>
    );
  }
}

export default StudentPages;
