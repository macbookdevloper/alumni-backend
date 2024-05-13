const mongoose = require("mongoose");

const NewAlumniSchema = new mongoose.Schema({
  EnrollementNumber: {
    type: Number,
    require: true,
  },
  Password: {
    type: String,
    require: true,
    maxLangth: 20,
  },
  Year: {
    type: Number,
    require: true,
  },
  Role: {
    type: String,
    enum: ["Admin", "Alumni"],
  },
  Login: {
    type: Boolean,
    require: true,
  },
  Email:{
    type:String,
    require:true,
  }
});

module.exports = mongoose.model("NewAlumniModel", NewAlumniSchema);
