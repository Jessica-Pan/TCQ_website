import React, { Component } from "react";

import { get, post } from "../../utilities.js";

// prop: game: the game object
class GameOverviewPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { gradeTable: <> Not gotten yet </> };
  }

  //   ANSWER:
  //   gameCode: String,
  //   questionNumber: Number,
  //   team: String,
  //   content: [String],
  //   startTime: String,
  //   grade: [Number],

  getGrades = () => {
    console.log("getting the grades");
    get("/api/grades", { gameCode: this.props.game.gameCode }).then((results) => {
      console.log("got the grades");
      console.log(results);
      let answerDict = {};
      for (let i = 0; i < results.length; i++) {
        const answer = results[i];
        if (answer.team in answerDict) {
          answerDict[answer.team][answer.questionNumber] = answer.grade;
        } else {
          let startingArray = new Array(this.props.game.questions.length);
          startingArray[answer.questionNumber] = answer.grade;
          answerDict[answer.team] = startingArray;
        }
      }

      let answerTable = [];
      for (var key in answerDict) {
        // check if the property/key is defined in the object itself, not in parent
        if (answerDict.hasOwnProperty(key)) {
          answerTable.push([key, answerDict[key]]);
        }
      }
      let answerTableHTML = <> {answerTable} </>;
      this.setState({ gradeTable: answerTableHTML });
    });
  };

  render() {
    return (
      <>
        Here is the information for the game with code {this.props.game.gameCode}. The admin
        password is
        {this.props.game.adminPassword}. Here are your questions and their passwords:
        {this.props.game.questions.map((question, i) => (
          <div key={`question-overview-${i}`}>
            <h2> Question {i + 1}: </h2>
            <p> Students get {this.props.game.times[i]} seconds to answer this question </p>
            <p> The password for this question is {this.props.game.questionPasswords[i]} </p>
            {question.map((singleQuestion, j) => (
              <div key={`question-${i}-part-${j}`}>
                <h4> Part {j + 1}: </h4>
                <p> Question: {singleQuestion} </p>
                <p> This is worth {this.props.game.points[i][j]} points. </p>
              </div>
            ))}
          </div>
        ))}
        <button onClick={this.getGrades}> Show grades </button>
        {this.state.gradeTable}
      </>
    );
  }
}

export default GameOverviewPage;
