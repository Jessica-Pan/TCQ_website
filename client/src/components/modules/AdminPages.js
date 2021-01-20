import React, { Component } from "react";

import AdminLogin from "./Admin-Login.js";
import ProctorPage from "./ProctorPage.js";

class AdminPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      role: "", //two roles: P for proctor and G for grader
    };
  }

  setGame = (game, role) => {
    this.setState({ game: game, role: role });
    console.log(role);
  };

  render() {
    if (this.state.game === undefined) {
      return (
        <>
          <AdminLogin setGame={this.setGame} />
        </>
      );
    }
    if (this.state.role === "p") {
      return <ProctorPage game={this.state.game} />;
    }
    return <> GRADERS PAGES </>;
  }
}

export default AdminPages;
