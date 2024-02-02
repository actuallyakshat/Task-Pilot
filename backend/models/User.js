const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  minsCompleted: {
    type: Number,
    default: 0,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ToDo",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
