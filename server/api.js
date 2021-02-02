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

//given gameCode, add player to room
router.post("/new-player", (req, res) => {
  socketManager.addPlayerToRoom(req.body.user, req.body.gameCode, req.body.teamName);
});

//given gameCode, updatedAns, teamName
router.post("/textbox-update", (req, res) => {
  console.log("I'm in the post request for this answer");
  console.log(req.body.newAns);
  socketManager.updateTextbox(req.body.newAns, req.body.gameCode, req.body.teamName);
});

// takes the game code as the parameter code
router.post("/new-game/", (req, res) => {
  const newGame = new Game({
    gameCode: req.body.gameCode,
    parts: req.body.parts,
    questions: req.body.questions,
    times: req.body.times,
    points: req.body.points,
    questionPasswords: req.body.questionPasswords,
    adminPassword: req.body.adminPassword,
    teams: req.body.teams,
  });
  newGame.save();
  console.log("POSTED");
});

router.get("/game-info", (req, res) => {
  console.log("in get");
  console.log(`QUERY: ${req.query.gameCode}`);
  Game.findOne({ gameCode: req.query.gameCode }).then((results) => {
    console.log(results);
    res.send(results);
  });
});

// given the gameCode, questionNum, startTime, teamName
router.post("/start-time/", (req, res) => {
  console.log("moving everyone to next page");
  socketManager.nextQ(req.body.gameCode, req.body.teamName);
  Answer.findOne({
    gameCode: req.body.gameCode,
    questionNumber: req.body.questionNum,
    team: req.body.teamName,
  }).then((answer) => {
    if (answer === null) {
      const currDate = new Date().toLocaleString();
      const newAnswer = new Answer({
        gameCode: req.body.gameCode,
        questionNumber: req.body.questionNum,
        team: req.body.teamName,
        content: ["Not submitted"],
        startTime: currDate,
        grade: [-1],
      });
      newAnswer.save();
    }
  });
});

router.post("/proct-reset", (req, res) => {
  console.log("in proct reset post");
  socketManager.proctResetTime(req.body.gameCode, req.body.teamName);
});

router.post("/test", (req, res) => {
  console.log("TEST TEST 123");
  console.log(req.body.time);
});

// given the gameCode, questionNum, teamName, content
router.post("/student-answers/", (req, res) => {
  console.log("adding the actual answer to the mix");
  Answer.findOne({
    gameCode: req.body.gameCode,
    questionNumber: req.body.questionNum,
    team: req.body.teamName,
  }).then((answer) => {
    if (answer !== null) {
      answer.content = req.body.content;
      answer.grade = [-1];
      console.log("here is the updated answer with content");
      console.log(answer);
      answer.markModified("content");
      answer.save();
    } else {
      console.log("Could not find the answer with these attributes:");
      console.log(req.body.questionNum + " " + req.body.gameCode + " " + req.body.teamName);
    }
  });
});

//given gameCode and teamName
router.get("/answer_exists", (req, res) => {
  console.log("seeing if the answer exists");
  Answer.find({ gameCode: req.query.gameCode, team: req.query.teamName }).then((results) => {
    console.log(results);
    res.send({ exists: results.length !== 0 });
  });
});

// given the gameCode and questionNum, get all the answers
router.get("/answers/", (req, res) => {
  Answer.find({
    gameCode: req.query.gameCode,
    questionNumber: req.query.questionNum,
  }).then((results) => {
    res.send(results);
  });
});

// given the gameCode
router.get("/start-times/", (req, res) => {
  Answer.find({ gameCode: req.query.gameCode }).then((results) => {
    res.send(results);
  });
});

// given the gameCode, questionNum, partNum, teamName, grade, numParts
router.post("/grades/", (req, res) => {
  console.log("submitting the grades");
  Answer.findOne({
    gameCode: req.body.gameCode,
    questionNumber: req.body.questionNum,
    team: req.body.teamName,
  }).then((answer) => {
    if (answer !== null) {
      let newGrades = answer.grade;
      if (newGrades.length === 0) {
        newGrades = new Array(req.body.numParts).fill("NG");
      }
      newGrades[req.body.partNum] = req.body.grade;

      console.log(newGrades);
      answer.grade = newGrades;
      answer.save();
      socketManager.gradeChanged(
        req.body.gameCode,
        req.body.questionNum,
        req.body.teamName,
        newGrades
      );
      console.log("done submitting");
    } else {
      console.log("Could not find the answer with these attributes:");
      console.log(req.body.questionNum + " " + req.body.gameCode + " " + req.body.teamName);
    }
  });
});

router.get("/grades/", (req, res) => {
  Answer.find({
    gameCode: req.query.gameCode,
  }).then((results) => {
    res.send(results);
  });
});

// // image upload
// // image: questionNum, gameCode
// router.post("/api/upload-image", (req, res) => {
//   console.log("posting an image for question " + req.body.questionNum)
//   const newImage = new Image({
//     gameCode: req.body.gameCode,
//     questionNumber: req.body.questionNum,
//     img: {
//       data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
//       contentType: "image/png",
//     },
//   });
//   newImage.save();
//   console.log("posted")
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
