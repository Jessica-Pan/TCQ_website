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

  hexToBase64 = (hexstring) => {
    return btoa(
      hexstring
        .match(/\w{2}/g)
        .map(function (a) {
          return String.fromCharCode(parseInt(a, 16));
        })
        .join("")
    );
  };
  render() {
    console.log(this.state.images);
    return (
      <div>
        Image for this question:{" "}
        {this.state.images.map((image, i) => (
          <img
            key={`${this.props.gameCode}IMAGE${i}`}
            src={"data:image/jpg;base64," + image.img.data.toString("base64")}
          />
        ))}{" "}
      </div>
    );
  }
}

export default ImageDisplay;
