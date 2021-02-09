import React, { Component } from "react";

import { get, post } from "../../utilities.js";

// prop: game: the game object
class GameOverviewPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { gradeTable: ["not gotten yet."] };
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
    let questionHeaders = "";
    for (let i = 0; i < this.props.game.questions.length; i++) {
      for (let j = 0; j < this.props.game.questions[i].length; j++) {
        questionHeaders += `\tQuestion-${i + 1}-part-${j + 1}`;
      }
    }
    questionHeaders += "\tTotal Score";
    get("/api/grades", { gameCode: this.props.game.gameCode }).then((results) => {
      console.log("got the grades");
      console.log(results);
      let answerDict = {};
      for (let i = 0; i < results.length; i++) {
        const answer = results[i];
        if (answer.team in answerDict) {
          let grade = answer.grade;
          if (grade === []) {
            grade = "NG";
          }
          for (let j = 0; j < grade.length; j++) {
            if (grade[j] === -1) {
              grade[j] = "NG";
            }
          }
          answerDict[answer.team][answer.questionNumber - 1] = grade;
        } else {
          let startingArray = new Array(this.props.game.questions.length).fill("NA");
          let grade = answer.grade;
          console.log(answer.grade);
          if (grade.length === 0 || grade[0] === -1) {
            console.log("here");
            grade = "NG";
          }
          startingArray[answer.questionNumber - 1] = grade;
          console.log(startingArray);
          answerDict[answer.team] = startingArray;
        }
      }

      console.log(answerDict);

      let answerTable = [];
      for (var key in answerDict) {
        // check if the property/key is defined in the object itself, not in parent
        if (answerDict.hasOwnProperty(key)) {
          let teamArray = [key];
          //   console.log(key);
          //   console.log(answerDict[key]);
          let total = 0;
          console.log(teamArray);
          for (let i = 0; i < answerDict[key].length; i++) {
            // console.log(answerDict[key][i]);
            if (Array.isArray(answerDict[key][i])) {
              for (let j = 0; j < answerDict[key][i].length; j++) {
                const toAdd = parseInt(answerDict[key][i][j]);
                teamArray.push(toAdd);
                // console.log(toAdd);
                if (!isNaN(toAdd)) {
                  //   console.log("not a nan");
                  total += toAdd;
                }
              }
            } else {
              const toAdd = parseInt(answerDict[key][i]);
              teamArray.push(toAdd);
              // console.log(toAdd);
              if (!isNaN(toAdd)) {
                //   console.log("not a nan");
                total += toAdd;
              }
            }
            // console.log(total);
          }
          teamArray.push(total);
          //   console.log(teamArray);
          answerTable.push(teamArray.join("\t"));
        }
      }
      let answerTableString = answerTable.join("\n");
      this.setState({ gradeTable: [questionHeaders].concat(answerTable) });
    });
  };

  download = (data, filename, type) => {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  handleDownload = () => {
    this.download(
      this.state.gradeTable.join("\n"),
      `${this.props.game.gameCode}-grades.csv`,
      "csv"
    );
  };

  cuttOff = (string) => {
    string = string.split(" ").slice(0, 6).join(" ") + "...";
    return string;
  };

  toHTMLTable = (array) => {
    return (
      <table>
        {array[0].split("\t").map((elem) => (
          <th> {elem} </th>
        ))}
        {array.slice(1).map((line) => (
          <tr>
            {line.split("\t").map((elem) => (
              <td> {elem} </td>
            ))}
          </tr>
        ))}
      </table>
    );
  };

  render() {
    console.log(this.state.gradeTable);
    return (
      <>
        Here is the information for the game with code {this.props.game.gameCode}. The admin
        password is {this.props.game.adminPassword}.{" "}
        <div> Here are all of the teams in this game: {this.props.game.teams.join(", ")} </div> Here
        are your questions and their passwords:
        {this.props.game.questions.map((question, i) => (
          <div key={`question-overview-${i}`}>
            <h2> Question {i + 1}: </h2>
            <p> Students get {this.props.game.times[i]} seconds to answer this question </p>
            <p> The password for this question is {this.props.game.questionPasswords[i]} </p>
            {question.map((singleQuestion, j) => (
              <div key={`question-${i}-part-${j}`}>
                <h4> Part {j + 1}: </h4>
                <p> Question: {this.cuttOff(singleQuestion)} </p>
                <p> This is worth {this.props.game.points[i][j]} points. </p>
              </div>
            ))}
          </div>
        ))}
        <button onClick={this.getGrades}> Show grades </button>
        {this.toHTMLTable(this.state.gradeTable)}
        <button onClick={this.handleDownload}> Download </button>
      </>
    );
  }
}

export default GameOverviewPage;
