const bcrypt = require("bcryptjs");
const AlumniDetails = require("../model/alumni_model");
require("dotenv").config();

// SignUp API
const addProfileDetails = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const {
      enrollementNumber,
      lastName,
      firstName,
      userName,
      email,
      phoneNo,
      technologies,
      description1,
      description2,
      linkdinLink,
      githubLink,
      twitterLink,
      companyName,
      position,
      workingExperience,
      confirmPassword,
      password,
    } = req.body;

    if (
      !enrollementNumber ||
      !lastName ||
      !firstName ||
      !email ||
      !phoneNo ||
      !confirmPassword ||
      !password
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    // If alumni dont want to change there Email. & after check email is unique.
    const user_exist = await AlumniDetails.findOne({
      enrollementNumber: enrollementNumber,
    });
    const existingUser = await AlumniDetails.findOne({ email: email });

    if (user_exist.email == email || !existingUser) {
      const hashePassword = await bcrypt.hash(password, 10);
      const alumni = await AlumniDetails.findOneAndUpdate(
        { enrollementNumber },
        {
          lastName,
          firstName,
          userName,
          email,
          phoneNo,
          technologies,
          description1,
          description2,
          linkdinLink,
          githubLink,
          twitterLink,
          password: hashePassword,
          image: imagePath,
          login: true,
        },
        { new: true }
      );
      if (companyName && position && workingExperience) {
        alumni.company.push({
          companyName,
          position,
          workingExperience,
        });
        await alumni.save(); // Save the updated company information
      }

      return res.status(200).json({
        success: true,
        alumni,
        message: "User registered successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: console.log(error),
      success: false,
      message: "Alumni details cannot be add. Please try again.",
    });
  }
};

//  Login API
const login = async (req, res) => {
  try {
    const { enrollementNumber, password } = req.body;
    if (!enrollementNumber || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const user = await AlumniDetails.findOne({ enrollementNumber });
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Enrollment OR Password is Incorrect",
      });
    }
    const is_match = await bcrypt.compare(password, user.password);
    if (is_match) {
      return res.status(200).json({
        success: true,
        message: "Login Succesfull",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Enrollment OR Password is Incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
      error: console.log(error),
    });
  }
};

//  Alumni post image & Discription of image API
async function alumnipost(req, res) {
  const alumniID = req.params.id;
  const postimagePath = req.file ? req.file.path : null;
  const postDescription = req.body.postdescription;
  try {
    const updatedUser = await AlumniDetails.findOneAndUpdate(
      { enrollementNumber: alumniID },
      {
        $push: {
          post: {
            alumnipost: postimagePath,
            postdescription: postDescription,
          },
        },
      },
      { new: true, fields: { _id: 0, __v: 0, password: 0 } }
    );

    if (!updatedUser) {
      return res.status(401).json({
        success: false,
        message: "Alumni not Found",
      });
    }

    return res.status(200).json({
      message: "Post added successfully",
      success: true,
      userInfo: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "post is not Upload Succesfully",
      error: console.log(error),
    });
  }
}

//  Get all Alumni detail(Name, profilePhoto, Skills)

async function getallAlumni(res) {
  try {
    // const all_alumni = await AlumniDetails.find()
    // const loggedInAlumni = all_alumni.filter(alumni => alumni.login === false);

    const loggedInAlumni = await AlumniDetails.find(
      { login: true },
      "firstName lastName skills image"
    ); //

    return res.status(200).json({
      "Alumni Details": loggedInAlumni,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Alumni is Not Register",
      error: console.log(error),
    });
  }
}

async function alumniDetailById(req, res) {
  try {
    const id = req.params.id;
    const alumni_By_Id = await AlumniDetails.findOne({ enrollementNumber: id });
    if (alumni_By_Id) {
      if (alumni_By_Id.login === true) {
        return res.status(200).json({
          Details: alumni_By_Id,
          success: true,
        });
      } else {
        return res.status(404).json({
          message: "First Sign up Your Account",
          success: false,
        });
      }
    } else {
      return res.status(404).json({
        message: "Alumni not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  addProfileDetails,
  login,
  alumnipost,
  getallAlumni,
  alumniDetailById,
};
