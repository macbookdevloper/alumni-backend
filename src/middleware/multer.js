const multer = require("multer");
require("dotenv").config();
const filePath = process.env.EXLS_FILE;
const path = require("path");

const csvStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${filePath}/UserData`);
  },
  filename: function (req, file, cb) {
    const allowedExtensions = [".xls", ".xlsx", ".csv"];
    const fileExtension = file.originalname
      .slice(file.originalname.lastIndexOf("."))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(
        new Error("Only .xls, .xlsx, and .csv files are allowed!"),
        false
      );
    }
    cb(null, file.originalname);
  },
});

//  alumni Post
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${filePath}/AlumniPost`);
  },
  filename: function (req, file, cb) {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".tiff",
      ".heic",
    ];
    const fileExtension = file.originalname
      .slice(file.originalname.lastIndexOf("."))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(
        new Error(
          "Only .jpg or .jpeg .png .gif .bmp .tiff and .heic files are allowed!"
        ),
        false
      );
    }
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${filePath}/ProfilePhoto`);
  },
  filename: function (req, file, cb) {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".tiff",
      ".heic",
    ];
    const fileExtension = file.originalname
      .slice(file.originalname.lastIndexOf("."))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(
        new Error(
          "Only .jpg or .jpeg .png .gif .bmp .tiff and .heic files are allowed!"
        ),
        false
      );
    }
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadCsvFile = multer({ storage: csvStorage });
const postUpload = multer({ storage: postStorage });
const profileUpload = multer({ storage: profileStorage });

module.exports = {
  uploadCsvFile,
  postUpload,
  profileUpload,
};
