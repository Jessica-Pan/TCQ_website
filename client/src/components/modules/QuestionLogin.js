import React, { Component } from "react";
import "../../utilities.css";
import "../pages/LoginPages.css";

// props:
// name
// password
// questionNum
// time
// onSuccess
class QuestionLogin extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      inputedPassword: "",
    };
  }

  handleSubmit = (event) => {
    if (this.state.inputedPassword === this.props.password) {
      this.props.onSuccess();
    } else {
      alert("That password was incorrect");
    }
  };

  handleChangePassword = (event) => {
    // to UpperCase()
    this.setState({
      inputedPassword: event.target.value,
    });
  };

  render() {
    return (
      <>
        <h1 className="title">
          {this.props.name}: Question {this.props.questionNum}
        </h1>
        <h3 className="standard-text u-textCenter"> Team: {this.props.teamName} </h3>
        <h3 className="standard-text u-textCenter"> Time: {this.props.time} seconds </h3>
        <div className="button-holder login-div">
          <div className="login-div">
            <input
              className="login-textbox"
              type="text"
              placeholder="question password"
              onChange={this.handleChangePassword}
            />
          </div>
          <span className="button" onClick={this.handleSubmit}>
            <span className="button-text">Submit </span>
          </span>
        </div>
      </>
    );
  }
}

export default QuestionLogin;
