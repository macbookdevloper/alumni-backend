const alumniModel = require("../model/alumni_model");
const bcrypt = require("bcryptjs");

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
    const userDetails = await alumniModel.findOne({
      enrollementNumber: enrollementNumber,
    });
    const existingUser = await alumniModel.findOne({ email: email });

    if (userDetails.email == email || !existingUser) {
      const hashePassword = await bcrypt.hash(password, 10);
      const alumni = await alumniModel.findOneAndUpdate(
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
        alumniModel.company.push({
          companyName,
          position,
          workingExperience,
        });
        await alumniModel.save(); // Save the updated company information
      }

      return res.status(200).json({
        success: true,
        data:alumni,
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

module.exports = { addProfileDetails };
