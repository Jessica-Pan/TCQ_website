import React, { Component } from "react";
import "../../utilities.css";
import "../pages/New-Game.css";
import ImgUpload from "./ImgUpload";

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
        <h4> Part {this.props.id} </h4>
        Points:
        <input className="small-text-box" type="number" onChange={this.handleChangePoints} />
        <div className="standard-text">
          Question text:
          <textarea
            rows="10"
            cols="80"
            className="large-text-box"
            onChange={this.handleChangeQuestion}
          />
        </div>
        <ImgUpload/>
      </>
    );
  }
}

export default PartInput;
