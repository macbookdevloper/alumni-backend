const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Alumni Management/public/upload");
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

const multerMiddleware = multer({ storage: storage });

module.exports = { multerMiddleware };
