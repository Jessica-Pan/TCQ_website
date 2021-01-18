import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "./LoginPages.css";

class Start extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    return (
      <>
        <h1 className="title">Team Challenge Questions </h1>
        <div className="button-holder">
          <span className="button">
            <Link to="/student/" className="button-text">
              {" "}
              student{" "}
            </Link>
          </span>
          <span className="button">
            <Link to="/admin/" className="button-text">
              {" "}
              admin{" "}
            </Link>
          </span>
        </div>
      </>
    );
  }
}

export default Start;
