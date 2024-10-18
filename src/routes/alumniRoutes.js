const express = require("express");
const routes = express();
const { postUpload,profileUpload } = require("../middleware/multer");
const alumni_function = require("../controller/alumni_controller");
const {
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/authControllers");
const { addProfileDetails } = require("../controller/profileControllers");

//-------authControllers-----------
//  Alumni Login Routes.
routes.post("/login", login);
//  Forgot Password API
routes.post("/forgotPassword", forgotPassword);
// Reset Password
routes.put("/resetpassword/:token", resetPassword);

//  Alumni SignUp Routes.
routes.post(
  "/addDetails",
  profileUpload.single("image"),
  addProfileDetails
);

//  Alumni Post there image and Discription of image.
routes.post(
  "/alumnipost/:id",
  postUpload.single("alumnipost"),
  alumni_function.alumnipost
);

//  Get all Alumni Information(permanent)
routes.get("/", alumni_function.getallAlumni);

//  Get alumni by ID
routes.get("/:id", alumni_function.alumniDetailById);

module.exports = routes;
