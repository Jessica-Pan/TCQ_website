import React, { Component } from "react";
import ProctorReset from "./ProctorReset.js";

import { get, post } from "../../utilities.js";

// prop: game: the game object
class ProctorPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { answerObjects: [] };
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
        <h1> {this.props.game.gameCode} </h1>
        {this.state.answerObjects.map((answerObj, i) => (
          <div key={`answerObject-${i}`}>
            <h2> {answerObj.team} </h2>
            <p>
              Started Question {answerObj.questionNumber} at {answerObj.startTime}{" "}
            </p>
          </div>
        ))}

        <ProctorReset gameCode = {this.props.game.gameCode}/>
          
      </>
    );
  }
}

export default ProctorPage;
