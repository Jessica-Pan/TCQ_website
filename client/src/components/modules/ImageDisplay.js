import React from "react";
import "../../utilities.css";

import { get, post } from "../../utilities.js";

// const path = require("path");
// const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
const PUBLIC_URL = "";

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
      console.log("GOT THE IMAGES");
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

  formatURL = (extension) => {
    if (extension.includes("public/")) {
      extension = extension.substr(extension.indexOf("/"));
    }
    const finalPath = PUBLIC_URL + extension;
    console.log("here's the final path for the image: ");
    console.log(finalPath);
    return finalPath;
  };
  render() {
    console.log(this.state.images);
    return (
      <div>
        {/* Image for this question:
        TEST: <img src={"http://localhost:3000/uploads/IMAGE-1612477613912.jpg"} alt="test" /> */}
        {this.state.images.map((image, i) => (
          // <> {path.join("../../../../", image.img.path)} </>
          <img
            key={`${this.props.gameCode}IMAGE${i}`}
            alt={`Image Number ${i}`}
            src={this.formatURL(image.img.path)}
            // src={"data:image/jpg;base64," + image.img.data.toString("base64")}
          />
        ))}{" "}
      </div>
    );
  }
}

export default ImageDisplay;
