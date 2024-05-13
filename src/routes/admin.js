const express = require("express");
const routes = express();
const { multerMiddleware } = require("../middleware/multer");
const { CreateNewAlumni,sendInvations } = require("../controller/CreateAccount");


routes.post("/upload", multerMiddleware.single("file"), CreateNewAlumni);
routes.post('/api/sendInvitaion',sendInvations);

module.exports = routes;
