const { Router } = require("express");
const router = Router();

//controllers
const {
  getToDo,
  createToDo,
  deleteToDo,
  updateToDo,
  updateState,
} = require("../controllers/ToDoController");
const { signup, login, auth } = require("../controllers/Authentication");

//Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/auth", auth);

//CRUD routes
router.get("/", getToDo);
router.post("/create-todo", createToDo);
router.put("/update-todo", updateToDo);
router.delete("/delete-todo", deleteToDo);
router.put("/update-state", updateState)

module.exports = router;
