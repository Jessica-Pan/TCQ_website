const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  gameCode: String,
  questionNumber: Number,
  img: { data: Buffer, contentType: String },
});

// compile model from schema
module.exports = mongoose.model("image", ImageSchema);
