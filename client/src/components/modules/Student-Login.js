import React, { Component } from "react";
import "../../utilities.css";
import "../pages/LoginPages.css";

// props: submitGameCode, submitTeamName, teams
class StudentLogin extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      inputedCode: "",
      inputedTeam: "",
      gotGame: false,
    };
  }

  submitTeamName = (event) => {
    this.props.submitTeamName(this.state.inputedTeam);
    // this.setState({ gotGame: true });
  };

  submitGameCode = (event) => {
    this.props.submitGameCode(this.state.inputedCode);
    this.setState({ gotGame: true });
  };

  handleSelect = (event) => {
    this.setState({ inputedTeam: event.target.value });
  };

  handleChangeCode = (event) => {
    this.setState({
      inputedCode: event.target.value,
    });
  };

  render() {
    let submitButton = this.state.gotGame ? (
      <span className="button" onClick={this.submitTeamName}>
        <span className="button-text">Submit Team Name </span>
      </span>
    ) : (
      <span className="button" onClick={this.submitGameCode}>
        <span className="button-text">Submit Game Code </span>
      </span>
    );
    let teamInput;
    console.log(this.props.teams);
    if (this.state.gotGame && this.props.teams.length !== 0) {
      teamInput = (
        <select onChange={this.handleSelect}>
          <option value="">--Please choose a team--</option>
          {this.props.teams.map((teamName) => (
            <option value={teamName}>{teamName}</option>
          ))}
        </select>
      );
    }
    return (
      <>
        <h1 className="title">Team Challenge Questions </h1>
        <div className="button-holder login-div">
          <div className="login-div">
            <input
              className="login-textbox"
              type="text"
              placeholder="game code"
              onChange={this.handleChangeCode}
            />
          </div>
          {teamInput}
          {/* <div className="login-div">
            <input
              className="login-textbox"
              type="text"
              placeholder="your team"
              onChange={this.handleChangeName}
            />
          </div> */}
          {submitButton}
        </div>
      </>
    );
  }
}

export default StudentLogin;
