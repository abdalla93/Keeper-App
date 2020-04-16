const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title"]
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Please add content"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", NoteSchema);
