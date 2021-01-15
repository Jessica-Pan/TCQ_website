import React, { Component } from "react";
import "../../utilities.css";
import "./LoginPages.css";


class StudentLogin extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {};
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
                    onChange={this.handleChange}
                    />
            </div>
            <div className="login-div">
                <input
                    className = "login-textbox"
                    type="text"
                    placeholder="your name"
                    onChange={this.handleChange}
                    />
            </div>
          </div>
        </>
      );
    }
  }
  
  export default StudentLogin;
  