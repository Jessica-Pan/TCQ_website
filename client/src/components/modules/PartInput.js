import React, { Component } from "react";
import "../../utilities.css";
import "../pages/New-Game.css";

// @param id: Number
// @param handleChangePoints
// @param handleChangeQuestion
// @param handleChangeTime
class PartInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Initialize Default State
  }

  handleChangeQuestion = (event) => {
    this.props.changeQuestion(this.props.id, event.target.value);
  };

  handleChangePoints = (event) => {
    this.props.changePoints(this.props.id, event.target.value);
  };

  render() {
    return (
      <>
        <h3> Part {String.fromCharCode(this.props.id - 1 + "A".charCodeAt(0))} </h3>
        Points:
        <input
          className="small-text-box"
          type="number"
          value={this.props.points}
          onChange={this.handleChangePoints}
        />
        <div className="standard-text">
          Question text: <br />
          <textarea
            value={this.props.question}
            rows="10"
            cols="80"
            className="large-text-box"
            onChange={this.handleChangeQuestion}
          />
        </div>
      </>
    );
  }
}

export default PartInput;
