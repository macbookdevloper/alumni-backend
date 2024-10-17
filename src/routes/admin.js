const express = require("express");
const routes = express();
const { multerMiddleware } = require("../middleware/multer");
const { CreateNewAlumni,sendInvations } = require("../controller/createAccountController");

//demo comment from bilal side
//  Upload Email File API
routes.post("/upload", multerMiddleware.single("details"), CreateNewAlumni);

//  Send Email API
routes.post('/sendInvitaion',sendInvations);

module.exports = routes
