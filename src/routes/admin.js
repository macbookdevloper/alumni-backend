const express = require("express");
const routes = express();
const { uploadCsvFile, newsImageupload} = require("../middleware/multer");
const { CreateNewAlumni,sendInvations } = require("../controller/createAccountController");
// const createNewsController = require('../controller/createNews')
const {createNews} = require('../controller/createNews')

// Upload Email File API.
routes.post("/upload", uploadCsvFile.single("details"), CreateNewAlumni);

// Send Email API.
routes.post('/sendInvitaion',sendInvations);

// News API.
routes.post('/newscreate',newsImageupload.single("newsimage"),createNews);

module.exports = routes
