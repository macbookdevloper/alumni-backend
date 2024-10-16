const mongoose = require("mongoose");

const AlumniDetailsSchema = new mongoose.Schema({
  enrollementNumber: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description1:{
    type: String
  },
  description2:{
    type: String
  },
  batch: {
    type: Number,
    require: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Alumni"],
  },
  login: {
    type: Boolean,
    require: true,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  userName:{
    type: String
  },
  phoneNo: {
    type: Number,
  },
  gender: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  technologies: {
    type: [String],
  },
  linkdinLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  image: {
    type: String,
  },
  post: [
    {
      alumnipost: {
        type: String,
        required: true
      },
      postdescription: {
        type: String,
        required: true
      }
    }
  ],
  company:[
    {
      companyName:{
        type: String
      },
      position:{
        type: String
      },
      workingExperience:{
        type: String
      }
    }
  ],
  token:{
    type : String,
    default : ''
  }
});

module.exports = mongoose.model("AlumniDetails", AlumniDetailsSchema);
