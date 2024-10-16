const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const AlumniDetails = require("../model/alumni_model");
const mailFile = require("../utils/mailSender");
const { alumniInvite } = require("../mail/templates/alumniInvite");
require("dotenv").config();

const CreateNewAlumni = async (req, res) => {
 
  console.log("API called")
  // localhost:3001/v1/upload
  https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const defaultFileName = req.file.filename;
    const filePath = process.env.EXLS_FILE + defaultFileName;
    const jsonData = xlsToJson(filePath);
    const dataArray = jsonData["Sheet1"];

    for (const data of dataArray) {
      const alumni = new AlumniDetails(data)
      const addDetails= await alumni.save()
      console.log(addDetails)
    }

    const addModelData = await AlumniDetails.find({});
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: addModelData,
    });

    deleteFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const sendInvations = async (req, res) => {
  try {
    const salt=10
    const allData = await AlumniDetails.find({});
    for (const data of allData) {
      const responeseData = await mailFile.mailSender(
        data.email,
        "invitionEmail",
        alumniInvite(data.enrollementNumber, data.password),
      )
      password = await bcrypt.hash(data.password,salt);
      await AlumniDetails.findOneAndUpdate(
        { enrollementNumber: data.enrollementNumber },
        { $set: { password: password } },
        { new: true }
      );
    }
    res.status(202).json({
      success: true,
      message: "all mail is send",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "email is not send ",
      err:console.log(error),
    });
  }
};

const xlsToJson = (relativeFilePath) => {
  const filePath = path.resolve(__dirname, relativeFilePath);
  console.log(filePath);
  // Check if the file exists

  // Read the file
  const workbook = XLSX.readFile(filePath);
  const sheetNameList = workbook.SheetNames;
  const jsonResult = {};
  console.log("hii");

  sheetNameList.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    jsonResult[sheetName] = XLSX.utils.sheet_to_json(worksheet);
  });

  console.log("Conversion to JSON completed");
  return jsonResult;
};
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully:", filePath);
    }
  });
};

module.exports = { CreateNewAlumni, sendInvations };
