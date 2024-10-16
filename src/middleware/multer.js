const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/akmalalikadiwala/Desktop/Alumni Management/public/ProfilePhoto/");
  },
  filename: function (req, file, cb) {
    const allowedExtensions = [
      ".xls",
      ".xlsx",
      ".csv",
      ".jpeg",
      ".jpg",
      ".png",
      ".gif",
    ];
    const fileExtension = file.originalname
      .slice(file.originalname.lastIndexOf("."))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(
        new Error(
          "Only .jpeg,.jpg,.png.xls, .xlsx, and .csv files are allowed!"
        ),
        false
      );
    }
    cb(null, file.originalname);
  },
});

const multerMiddleware = multer({ storage: storage });

//  alumni Post  
const alumni_Post = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/Users/akmalalikadiwala/Desktop/Alumni Management/public/ProfilePhoto/');
  },
  filename: function (req, file, cb) {
      cb(null,Date.now()+"-Alumni-Post-"+file.originalname)
  }
});
const postupload = multer({ storage: alumni_Post });

module.exports = { 
  multerMiddleware,
  postupload
};
