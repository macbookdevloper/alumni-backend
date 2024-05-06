const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = async () => {
    await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("database connection succefully");
    })
    .catch((error) => {
      console.log(error);
      console.log("some database connection issue");
      process.exit(1);
    });
};

module.exports = databaseConnection;
