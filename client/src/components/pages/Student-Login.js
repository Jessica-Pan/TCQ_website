import React, { Component } from "react";
import "../../utilities.css";
import "./LoginPages.css";


class StudentLogin extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
          inputedCode: "",
          inputedTeam: ""
      };
    }

    handleClick = (event) => {
        console.log("clicked");
        console.log(`Team: ${this.state.inputedTeam}, Code: ${this.state.inputedCode}`);
        this.props.setGameCode(this.state.inputedCode);
    }

    handleChangeName = (event) => {
        this.setState({
            inputedTeam: event.target.value,
        });
    }

    handleChangeCode = (event) => {
        this.setState({
            inputedCode: event.target.value,
        });
    }

  
    render() {
      return (
        <>
          <h1 className="title">Team Challenge Questions </h1>
          <div className="button-holder login-div">
            <div className="login-div">
                <input
                    className = "login-textbox"
                    type="text"
                    placeholder="game code"
                    onChange={this.handleChangeCode}
                    />
            </div>
            <div className="login-div">
                <input
                    className = "login-textbox"
                    type="text"
                    placeholder="your team"
                    onChange={this.handleChangeName}
                    />
            </div>
            <span className="button" onClick={this.handleClick}> 
                <text className="button-text">Submit </text>
            </span>
          </div>
        </>
      );
    }
  }
  
  export default StudentLogin;
  