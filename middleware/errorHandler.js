const multer = require("multer");

const errorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.json({ message: "The file is too large" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.json({ message: "file limit reached" });
    }
  }
};

module.exports = errorHandler;
