import React, { Component } from "react";
import "../../utilities.css";
import "../pages/New-Game.css";

// @param id: Number
// @param handleChangePoints
// @param handleChangeQuestion
// @param handleChangeTime
class QuestionInput extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
  }

  handleChangeQuestion = (event) => {
    this.props.changeQuestion(this.props.id, event.target.value);
  };

  handleChangeTime = (event) => {
    this.props.changeTime(this.props.id, event.target.value);
  };

  handleChangePoints = (event) => {
    this.props.changePoints(this.props.id, event.target.value);
  };

  render() {
    return (
      <>
        <div>
          <span className="standard-text">
            <h2 className="header-text"> Question {this.props.id}: </h2>
            Time (in seconds):
            <input className="small-text-box" type="number" onChange={this.handleChangeTime} />
            Points:
            <input className="small-text-box" type="number" onChange={this.handleChangePoints} />
          </span>
          <div className="standard-text">
            Question text:
            <textarea
              rows="10"
              cols="80"
              className="large-text-box"
              onChange={this.handleChangeQuestion}
            />
          </div>
        </div>
      </>
    );
  }
}

export default QuestionInput;
