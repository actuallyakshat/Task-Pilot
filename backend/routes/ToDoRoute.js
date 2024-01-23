const { Router } = require("express");
const router = Router();

//controllers
const {
  getToDo,
  createToDo,
  deleteToDo,
  updateToDo,
} = require("../controllers/ToDoController");

//routes
router.get("/", getToDo);
router.post("/create-todo", createToDo);
router.put("/update-todo", updateToDo);
router.delete("/delete-todo", deleteToDo);

module.exports = router;
