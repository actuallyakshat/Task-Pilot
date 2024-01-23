const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const routes = require("./routes/ToDoRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started successfully on port: ${PORT}`);
});

dbConnect();

app.use(express.json());
app.use(cors());
app.use(routes);
