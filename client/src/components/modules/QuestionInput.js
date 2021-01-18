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
          <span className="header-text">
            Question {this.props.id}:<text className="standard-text"> Time (in seconds): </text>
            <input className="small-text-box" type="number" onChange={this.handleChangeTime} />
            <text className="standard-text"> Points: </text>
            <input className="small-text-box" type="number" onChange={this.handleChangePoints} />
          </span>
          <div className="input-field">
            <text className="standard-text"> Question text: </text>
            <input className="small-text-box" type="text" onChange={this.handleChangeQuestion} />
          </div>
        </div>
      </>
    );
  }
}

export default QuestionInput;
