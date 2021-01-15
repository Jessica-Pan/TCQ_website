import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "./LoginPages.css";


class AdminLogin extends Component {
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
            <span className="button">
                <Link to="/new-game/" className= "button-text"> New Game </Link>
            </span>
            <div className="login-div" >
             <p className="button-text"> or </p>
            </div>
            <div className="login-div">
                <input
                    className = "login-textbox"
                    type="text"
                    placeholder="game code"
                    onChange={this.handleChange}
                    />
            </div>
          </div>
        </>
      );
    }
  }
  
  export default AdminLogin;
  