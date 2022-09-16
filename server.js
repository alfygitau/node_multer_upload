const express = require("express");
const multer = require("multer");
const uploadRoute = require("./routes/files");
const { v4: uuid } = require("uuid");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 4000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("this file is not an image"), false);
  }
};

// sinfle file uploads
// app.use("/api/upload", upload.single("file"), uploadRoute);

// multiple file uploads
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000, files: 2 },
});
app.use("/api/upload", upload.array("file", 2), uploadRoute);

// multiple fields
// const multiUploads = upload.fields([
//   { name: "avatar", maxCount: 2 },
//   { name: "resume", maxCount: 2 },
// ]);
// app.use("/api/upload", multiUploads, uploadRoute);

// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
