import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/LoginPages.css";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  handleSubmit = (event) => {
    console.log("clicked");
    console.log(`Code: ${this.state.gameCode}, Role: ${this.state.selected}`);
    this.props.setGameCode(this.state.gameCode, this.state.selected[0]);
  };

  handleSelect = (event) => {
    this.setState({ selected: event.target.value });
  };

  handleInputGameCode = (event) => {
    this.setState({ gameCode: event.target.value });
  };

  render() {
    return (
      <>
        <h1 className="title">Team Challenge Questions </h1>
        <div className="button-holder login-div">
          <span className="button">
            <Link to="/new-game/" className="button-text">
              New Game
            </Link>
          </span>
          <div className="login-div">
            <p className="button-text"> or </p>
          </div>
          <div className="login-div">
            <input
              className="login-textbox"
              type="text"
              placeholder="game code"
              onChange={this.handleInputGameCode}
            />
            <select onChange={this.handleSelect}>
              <option value="">--Please choose an option--</option>
              <option value="proctor">Proctor</option>
              <option value="grader">Grader</option>
            </select>
            <span className="button" onClick={this.handleSubmit}>
              <span className="button-text">Submit </span>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default AdminLogin;
