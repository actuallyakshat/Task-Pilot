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

const {
  signup,
  login,
  auth,
  sendOTP,
  deleteUser,
} = require("../controllers/Authentication");
const { updateUser, changePassword } = require("../controllers/EditProfile");

//Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/auth", auth);

//CRUD routes
router.get("/", getToDo);
router.post("/create-todo", createToDo);
router.put("/update-todo", updateToDo);
router.delete("/delete-todo", deleteToDo);
router.put("/update-state", updateState);
router.post("/send-otp", sendOTP);
router.delete("/delete-user", deleteUser);
router.put("/update-user", updateUser);
router.put("/change-password", changePassword);


module.exports = router;
