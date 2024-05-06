require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./config/DBConnection");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(
  express.json({
    limit: "20kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

databaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`server start on ${PORT}`);
  });
});
