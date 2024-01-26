const ToDo = require("../models/ToDoModel");
const User = require("../models/User");
//fetch all todos

exports.getToDo = async (req, res) => {
  try {
    const userid = req.query.userid;
    console.log(userid);
    const user = await User.findOne({ _id: userid });
    console.log(user);
    const todos = await ToDo.find({
      _id: { $in: user.todos },
    });
    if (todos) {
      console.log(todos);
      res.send(todos);
    } else {
      res.json({ msg: "No todos found" });
    }
  } catch (error) {
    console.log("Error occoured while fetching Todos:", error);
  }
};

//create todo
exports.createToDo = async (req, res) => {
  try {
    const userid = req.body.userid;
    const text = req.body.text;

    const todo = await ToDo.create({ text: text, completed: false });

    console.log("Added Todo Successfully to Todos collection:", todo);

    await User.updateOne({ _id: userid }, { $push: { todos: todo._id } });
    
    res.status(201).json(todo); // Sending a 201 status code for successful creation
  } catch (error) {
    console.error("Error occurred while creating Todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

//update todo
exports.updateToDo = async (req, res) => {
  try {
    const { _id, text } = req.body;
    await ToDo.findByIdAndUpdate(_id, { text: text })
      .then(() => {
        res.status(201).send("Updated Successfully...");
        console.log("Todo Updated Successfully");
      })
      .catch((error) => {
        console.log("Error while updating todo:", error.message);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.log("Error occurred while updating Todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

//delete todo
exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.query; // Change to req.query
    await ToDo.findByIdAndDelete(_id)
      .then(() => res.status(201).send("Deleted Successfully..."))
      .catch((error) => {
        console.log("Error while deleting Todo:", error);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.log("Error occurred while deleting Todo:", error);
    res.status(500).send("Internal Server Error");
  }
};
