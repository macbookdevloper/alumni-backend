
const uploadController= (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res
      .status(200)
      .json({
        message: "File uploaded successfully",
        filename: req.file.filename,
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {uploadController};
