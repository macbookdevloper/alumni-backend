const express = require("express");
const routes = express();
const { multerMiddleware } = require("../middleware/multer");
const { CreateNewAlumni } = require("../controller/CreateAccount");

routes.post("/upload", multerMiddleware.single("file"), CreateNewAlumni);

module.exports = routes;
