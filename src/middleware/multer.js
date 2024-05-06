const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Alumni Management/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerMiddleware = multer({ storage: storage });

module.exports = {multerMiddleware};
