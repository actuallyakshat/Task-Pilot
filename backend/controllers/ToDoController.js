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
