import React from "react";
import "../../utilities.css";
const axios = require("axios");

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
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
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form className="u-flex u-flex-alignCenter" onSubmit={this.onFormSubmit}>
        <h4 className="u-rightMargin">Image Upload </h4>
        <input type="file" name="myImage" onChange={this.onChange} required />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default ImageUpload;
