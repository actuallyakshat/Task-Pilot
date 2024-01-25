const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connection with database successful"))
    .catch((error) => {
      console.log("Connection with database unsucessful");
      console.error(error);
    });
};

module.exports = connect;
