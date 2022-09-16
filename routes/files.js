const express = require("express");
const { uploadFiles } = require("../controllers/files");

const router = express.Router();

router.route("/").post(uploadFiles)

module.exports = router;