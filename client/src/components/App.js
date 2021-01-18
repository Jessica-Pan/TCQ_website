import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";

import Start from "./pages/Start.js";
import AdminPages from "./modules/AdminPages.js";
import StudentPages from "./modules/StudentPages.js";
import NewGame from "./pages/New-Game.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Router>
          <Start path="/" />
          <AdminPages path="/admin/" />
          <StudentPages path="/student/" />
          <NewGame path="/new-game/" />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
