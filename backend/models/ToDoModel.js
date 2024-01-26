const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("ToDo", ToDoSchema);
