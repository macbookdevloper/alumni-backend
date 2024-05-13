require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("../src/config/DBConnection");
const routes = require("../src/routes/admin");
const app = express();
const PORT = process.env.PORT || 8080;

app.use("/v1", routes);
app.use(express.static("public"));
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
