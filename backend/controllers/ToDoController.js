const ToDo = require("../models/ToDoModel");

//fetch all todos
exports.getToDo = async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.send(todos);
  } catch (error) {
    console.log("Error occoured while fetching Todos:", error);
  }
};

//create todo
exports.createToDo = async (req, res) => {
  try {
    const { text } = req.body;
    await ToDo.create({ text }).then((data) => {
      console.log("Added Todo Sucessfully: ", data);
      res.send(data);
    });
  } catch (error) {
    console.log("Error occoured while creating Todo:", error);
  }
};

//update todo
exports.updateToDo = async (req, res) => {
  try {
    const { _id, text } = req.body;
    await ToDo.findByIdAndUpdate(_id, { text })
      .then(() => res.status(201).send("Updated Successfully..."))
      .catch((error) => {});
  } catch (error) {
    console.log("Error occoured while updating Todo:", error);
  }
};

//delete todo
exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.body;
    await ToDo.findByIdAndDelete(_id)
      .then(() => res.status(201).send("Deleted Successfully..."))
      .catch((error) => {});
  } catch (error) {
    console.log("Error occoured while deleting Todo:", error);
  }
};
