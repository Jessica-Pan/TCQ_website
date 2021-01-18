import React, { Component } from "react";

import StudentLogin from "./Student-Login.js";

class StudentPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      gameCode: "",
      teamName: "",
      studentName: "",
    };
  }

  setGameCode = (code) => {
    this.setState({ gameCode: code });
  };

  render() {
    if (this.state.gameCode == "") {
      return (
        <>
          <StudentLogin setGameCode={this.setGameCode} />
        </>
      );
    }
    return <> STUDENT PAGES </>;
  }
}

export default StudentPages;
