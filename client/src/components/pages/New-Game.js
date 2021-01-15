import React, { Component } from "react";
import QuestionInput from "./QuestionInput.js"
import "../../utilities.css";
import "./New-Game.css";
import "./LoginPages.css";


class NewGame extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        numQuestions: 1,
        password: "asdfasdf",
        questions: []
      };
    }

    handleClick = (event) => {
        console.log("clicked");
        console.log(`Team: ${this.state.inputedTeam}, Code: ${this.state.inputedCode}`);
        this.props.setGameCode(this.state.inputedCode);
    }

    handleChangeNumQ = (event) => {
        this.setState({
            numQuestions: event.target.value,
        });
    }

    handleChangeTime = (event) => {
        this.setState({
            inputedTime: event.target.value
        })
    }

    // handleChangePoints = (event) => {
    //     this.setState({
    //         inputedCode: event.target.value,
    //     });
    // }

    handleChangeQuestion = (event) => {
        this.setState({
            questions: event.target.value,
        });
    }

  
    render() {
        // i can't find a better way to do this, but there has to be one. 
      let questionsInput= <QuestionInput id="1"/>;
      if(this.state.numQuestions == 2){
        questionsInput = <> <QuestionInput id="1"/> <QuestionInput id="2" /> </>;
      }else if (this.state.numQuestions == 3){
        questionsInput = <> <QuestionInput id="1"/> <QuestionInput id="2" /> <QuestionInput id="3" /> </>;
      }
      return (
        <>
          <h1 className="header"> New Game </h1>
          <div className="New-Game-numQ">
              <text className="standard-text">
                Number of Questions:
              </text>
              <span className="New-Game-numQ-span">
                    <input
                    className = "small-text-box"
                    type="number"
                    onChange={this.handleChangeNumQ}
                    />
              </span>
          </div>
          {questionsInput}
          <div className="u-flex-justifyCenter top-margin">
          <span className="NewGame-button" onClick={this.handleClick}> 
            <text className="button-text">Set Game </text>
          </span>
          </div>
        </>
      );
    }
  }
  
  export default NewGame;
  