const express = require("express");
const routes = express();
const alumni_function = require("../controller/alumni_controller");
const { multerMiddleware, postupload} = require("../middleware/multer");

//  Alumni SignUp Routes.
routes.post("/addDetails", multerMiddleware.single("image"), alumni_function.addProfileDetails);

//  Alumni Login Routes.
routes.post("/login", alumni_function.login);

//  Alumni Post there image and Discription of image. 
routes.post('/alumnipost/:id',postupload.single('alumnipost'),alumni_function.alumnipost)

//  Get all Alumni Information(permanent)
routes.get('/', alumni_function.getallAlumni)

//  Get alumni by ID
routes.get('/:id',alumni_function.alumniDetailById)

//  Forgot Password API
routes.post('/forgot', alumni_function.forgot_password)

// Reset Password
routes.put('/reset/:token', alumni_function.reset_password)

module.exports = routes;
