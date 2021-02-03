import React from "react";
import "../../utilities.css";

import { get, post } from "../../utilities.js";

// PROPS:
// gameCode
// questionNum
class ImageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
    };
  }

  componentDidMount() {
    get("/api/images/", {
      gameCode: this.props.gameCode,
      questionNum: this.props.questionNum,
    }).then((results) => {
      this.setState({
        images: results,
      });
    });
  }

  render() {
    console.log(this.state.images);
    return <div> </div>;
  }
}

export default ImageDisplay;
