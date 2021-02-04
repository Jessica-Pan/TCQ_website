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
      images: [],
    };
  }

  componentDidMount() {
    console.log("getting the images");
    console.log(this.props.gameCode);
    console.log(this.props.questionNum);
    get("/api/images/", {
      gameCode: this.props.gameCode,
      questionNum: this.props.questionNum,
    }).then((results) => {
      console.log(results);
      this.setState({
        images: results,
      });
    });
  }

  render() {
    console.log(this.state.images);
    return (
      <div>
        THIS IS WHERE IMAGES ARE DISPLAYED{" "}
        {this.state.images.map((image) => (
          <img src={image.img.data} />
        ))}{" "}
      </div>
    );
  }
}

export default ImageDisplay;
