import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/LoginPages.css";

import { get, post } from "../../utilities.js";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { i: 0 };
  }

  handleSubmit = (event) => {
    console.log("clicked");
    console.log(`Code: ${this.state.gameCode}, Role: ${this.state.selected}`);
    if (this.state.selected === undefined) {
      alert("Please input a role first");
    } else {
      console.log("getting the game");
      get("/api/game-info/", { gameCode: this.state.gameCode }).then((results) => {
        if (this.state.password === results.adminPassword) {
          console.log("setting the game");
          this.props.setGame(results, this.state.selected[0]);
        } else {
          alert("That's not the right password");
        }
      });
    }
  };

  handleSelect = (event) => {
    this.setState({ selected: event.target.value });
  };

  handleInputGameCode = (event) => {
    this.setState({ gameCode: event.target.value });
  };

  handleInputPassword = (event) => {
    // toUpperCase here
    this.setState({ password: event.target.value });
  };

  testFunction = (event) => {
    let i = this.state.i;
    i += 1;
    console.log(i);
    post("/api/test", { num: i });
    this.setState({ i: i });
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
            <input
              className="login-textbox"
              type="text"
              placeholder="password"
              onChange={this.handleInputPassword}
            />
            <select className="dropDown" onChange={this.handleSelect}>
              <option value="">--Please choose an option--</option>
              <option value="proctor">Proctor</option>
              <option value="grader">Grader</option>
              <option value="info">Game Info</option>
            </select>
            <span className="button" onClick={this.handleSubmit}>
              <span className="button-text">Submit </span>
            </span>
          </div>
        </div>
        <button onClick={this.testFunction}> TEST </button>
      </>
    );
  }
}

export default AdminLogin;
