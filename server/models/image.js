const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  gameCode: String,
  questionNumber: Number,
  partNum: Number,
  img: { data: Buffer, path: String, contentType: String },
});

// compile model from schema
module.exports = mongoose.model("Image", ImageSchema);
