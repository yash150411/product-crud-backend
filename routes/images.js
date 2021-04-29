const express = require('express');
const router = express.Router();
const FileUploadCtrl = require('../util/fileUpload');

const fileUpload = new FileUploadCtrl();

router.route("/upload").post(fileUpload.UploadImage);
router.route("/show/:name").get(fileUpload.ShowImage);

module.exports = router;