import React, { Component } from "react";

import AdminLogin from "./Admin-Login.js";

class AdminPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      gameCode: "",
      role: "", //two roles: P for proctor and G for grader
    };
  }

  setGameCode = (code, role) => {
    this.setState({ gameCode: code, role: role });
  };

  render() {
    if (this.state.gameCode == "") {
      return (
        <>
          <AdminLogin setGameCode={this.setGameCode} />
        </>
      );
    }
    return <> ADMIN PAGES </>;
  }
}

export default AdminPages;
