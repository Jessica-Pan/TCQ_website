const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: String,
  gameCode: String,
  parts: [Number],
  questions: [[String]],
  times: [Number],
  points: [[Number]],
  questionPasswords: [String],
  adminPassword: String,
  teams: [String],
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
