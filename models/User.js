const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
