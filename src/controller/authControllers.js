const alumniModel = require("../model/alumni_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const random = require("randomstring");
const mailFile = require("../utils/mailSender");
const { resetPasswordMail } = require("../mail/templates/resetPasswordMail");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { enrollementNumber, password } = req.body;
    if (!enrollementNumber || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const user = await alumniModel.findOne({ enrollementNumber });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "not exist user please cheack a credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Enrollment OR Password is Incorrect",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login Succesfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
      error: console.log(error),
    });
  }
};

async function forgotPassword(req, res) {
  const isUserExist = await alumniModel.findOne({ email: req.body.email });
  if (!isUserExist) {
    res.status(400).json({
      status: false,
      message: "Email is not exit please try a valid email",
    });
  }
  const randomString = random.generate();
  const alumniData = await alumniModel.findOne({ email: req.body.email });
  await alumniModel.updateOne(
    { email: req.body.email },
    { $set: { token: randomString } }
  );
  await mailFile.mailSender(
    alumniData.email,
    "resetPassword",
    resetPasswordMail(randomString, alumniData.firstName)
  );
  res.status(200).json({
    status: true,
    message: "Check your Email",
  });
}

async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    console.log(token);

    const tokenData = await alumniModel.findOne({ token: token });
    if (!tokenData) {
      res.status(400).json({
        status: false,
        message: "Link is Expire please try again",
      });
    }
    const password = req.body.password;
    const hash_password = await bcrypt.hash(password, 10);
    const userInfo = await alumniModel.findByIdAndUpdate(
      { _id: tokenData._id },
      { $set: { password: hash_password, token: "" } },
      { new: true }
    );
    res.status(200).json({
      status: true,
      userInfo: {
        info: userInfo,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

module.exports = { login, forgotPassword, resetPassword };
