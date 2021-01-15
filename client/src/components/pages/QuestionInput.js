import React, { Component } from "react";
import "../../utilities.css";
import "./New-Game.css";

// @param id: Number 
// @param handleChangePoints
// @param handleChangeQuestion
class QuestionInput extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      
    }

  
    render() {
      //questionsInput = questionsInput + <>
    //   for (let i = 0; i < 2; i++){
    //       questionsInput += <p> QUESTION INPUT  </p>;
    //   }
      return (
        <>
           <div>
                <div className="header-text"> Question {this.props.id}: </div>  
                <span className="input-field"> 
                    <text className="standard-text"> Question text: </text> 
                    <input
                    className = "small-text-box"
                    type="text"
                    onChange={this.props.changeQuestion}
                    />  
                </span>  
            </div>
        </>
      );
    }
  }
  
  export default QuestionInput;
  