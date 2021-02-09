import React, { Component } from "react";

import AdminLogin from "./Admin-Login.js";
import GraderPage from "./GradersPage.js";
import ProctorPage from "./ProctorPage.js";
import GameOverviewPage from "./GameOverviewPage.js";
import EditGamePage from "./EditGamePage.js";

class AdminPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      role: "", //three roles: p for proctor, i for info and g for grader
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
    } else if (this.state.role === "i") {
      return <GameOverviewPage game={this.state.game} />;
    } else if (this.state.role === "e") {
      return <EditGamePage game={this.state.game} />;
    }
    return <GraderPage game={this.state.game} />;
  }
}

export default AdminPages;
