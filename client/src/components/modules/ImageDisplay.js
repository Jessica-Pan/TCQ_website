import React from "react";
import "../../utilities.css";

import { get, post } from "../../utilities.js";

const path = require("path");
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
  render() {
    console.log(this.state.images);
    return (
      <div>
        Image for this question: TEST 1 : <img src={require("./525.jpg")} alt="test 1" />
        TEST 2 : <img src={require("../525.jpg")} alt="test 2" />
        TEST 3 : <img src={require("../../525.jpg")} alt="test 3" />
        TEST 4 : <img src={require("../../../525.jpg")} alt="test 4" />
        TEST 5 : <img src={require("../../../../public/525.jpg")} alt="test 5" />
        TEST 6 :{" "}
        <img src={require("../../../../public/uploads/IMAGE-1612477613912.jpg")} alt="test 6" />
        {this.state.images.map((image, i) => (
          // <> {path.join("../../../../", image.img.path)} </>
          <img
            key={`${this.props.gameCode}IMAGE${i}`}
            alt={`Image Number ${i}`}
            src={require(`../../../../${image.img.path}`)}
            // src={"data:image/jpg;base64," + image.img.data.toString("base64")}
          />
        ))}{" "}
      </div>
    );
  }
}

export default ImageDisplay;
