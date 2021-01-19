/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const Game = require("./models/game");
const Answer = require("./models/answer");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// takes the game code as the parameter code
router.post("/new-game/", (req, res) => {
  const newGame = new Game({
    gameCode: req.body.gameCode,
    questions: req.body.questions,
    times: req.body.times,
    points: req.body.points,
    questionPasswords: req.body.questionPasswords,
    adminPassword: req.body.adminPassword,
  });
  newGame.save();
  console.log("POSTED");
});

router.get("/game-for-students/", (req, res) => {
  console.log(`QUERY: ${req.query.gameCode}`);
  Game.find({ gameCode: req.query.gameCode }).then((results) => {
    console.log(results);
    res.send(results);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
