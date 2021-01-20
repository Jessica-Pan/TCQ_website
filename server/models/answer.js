const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  gameCode: String,
  questionNumber: Number,
  team: String,
  content: [String],
  startTime: String,
});

// compile model from schema
module.exports = mongoose.model("answer", AnswerSchema);
