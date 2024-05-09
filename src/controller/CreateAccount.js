const XLSX = require("xlsx");
const fs = require("fs");
const bcrypt = require("bcrypt");
const NewAlumniModel = require("../model/NewAlumni");

const CreateNewAlumni = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const defaultFileName = req.file.filename;
    const filePath = `/Users/akmalalikadiwala/Desktop/Alumni Management/public/upload/${defaultFileName}`;

    const jsonData = xlsToJson(filePath);
    const dataArray = jsonData["Sheet1"];

    for (const data of dataArray) {
      data.Password = await bcrypt.hash(data.Password, 10);
      const alumni = new NewAlumniModel(data);
      await alumni.save();
    }

    const addModelData = await NewAlumniModel.find({});
    res.status(200).json({
      message: "File uploaded successfully",
      data: addModelData,
    });

    deleteFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const xlsToJson = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  const jsonResult = {};

  sheet_name_list.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    jsonResult[sheetName] = XLSX.utils.sheet_to_json(worksheet);
  });

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

module.exports = { CreateNewAlumni };
