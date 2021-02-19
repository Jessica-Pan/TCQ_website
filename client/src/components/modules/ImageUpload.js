import React from "react";
import "../../utilities.css";
import "./ImageUpload.css";
const axios = require("axios");

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      part: null,
      uploaded: [],
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("gameCode", this.props.gameCode);
    formData.append("questionNum", this.props.questionNum);
    formData.append("partNum", this.state.part);
    // formData.append("headers", {
    //   "content-type": "multipart/form-data",
    // });
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log("POSTING THE IMAGE");
    axios
      .post("/api/upload", formData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
        this.setState({
          uploaded: this.state.uploaded.concat([
            this.state.file.name + " for part " + this.state.part,
          ]),
        });
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onChangePart = (e) => {
    this.setState({ part: e.target.value });
  };

  render() {
    let uploaded = (
      <p>
        You've already uploaded:{" "}
        <ul>
          {this.state.uploaded.map((elem) => (
            <li> {elem} </li>
          ))}
        </ul>
      </p>
    );
    if (this.state.uploaded.length === 0) {
      uploaded = <p> No images uploaded yet for this question. </p>;
    }
    return (
      <div className="border">
        <form onSubmit={this.onFormSubmit}>
          <h3 className="u-rightMargin">
            Image Upload for Question{" "}
            {String.fromCharCode(this.props.questionNum - 1 + "A".charCodeAt(0))}
          </h3>
          <p> Part Number: </p>
          <input type="number" onChange={this.onChangePart} required />
          <p> Input your image here: </p>
          <input type="file" name="myImage" onChange={this.onChange} required />
          <button type="submit">Upload</button>
          {uploaded}
        </form>
      </div>
    );
  }
}

export default ImageUpload;
