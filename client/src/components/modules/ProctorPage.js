import React, { Component } from "react";
import ProctorReset from "./ProctorReset.js";

import { get, post } from "../../utilities.js";

import { socket } from "../../client-socket.js";

// prop: game: the game object
class ProctorPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { answerObjects: [] };

    //`startQ:${gameCode}`, { team: teamName, time: currTime }
    socket.on(`startQ:${this.props.game.gameCode}`, (data) => {
      let answers = this.state.answerObjects;
      answers.push({ questionNumber: data.questionNum, startTime: data.time, team: data.team });
      this.setState({ answers });
    });
  }

  componentDidMount = () => {
    get("/api/start-times/", { gameCode: this.props.game.gameCode }).then((results) => {
      console.log("found some results");
      this.setState({ answerObjects: results });
    });
  };

  // gameCode: String,
  //   questionNumber: Number,
  //   team: String,
  //   content: [String],
  //   startTime: String,
  render() {
    return (
      <>
        <h1>
          {this.props.game.name}: {this.props.game.gameCode}
        </h1>
        {this.state.answerObjects.map((answerObj, i) => (
          <div key={`answerObject-${i}`}>
            <h2> {answerObj.team} </h2>
            <p>
              Started Question{" "}
              {String.fromCharCode(answerObj.questionNumber - 1 + "A".charCodeAt(0))} at{" "}
              {answerObj.startTime}{" "}
            </p>
          </div>
        ))}

        <ProctorReset gameCode={this.props.game.gameCode} teams={this.props.game.teams} />
      </>
    );
  }
}

export default ProctorPage;
