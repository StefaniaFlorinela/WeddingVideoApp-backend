const express = require('express');
const router = express.Router();
const multer  = require('multer');
const validateUploadedFile = require('../middlewares/validationFilesSchema');
const File = require('../models/FileModels');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
   // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, path.extname(file.originalname)); // numele original
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single("file"), validateUploadedFile, async (req, res) => {
  try {
    //  console.log('File received:', req.file);

    const newFile = new File({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        filename: req.file.filename
    });

    const savedFile = await newFile.save();

    return res.status(200).json({
      id: savedFile._id,
      fieldname: savedFile.fieldname,
      path: savedFile.path,
      size: savedFile.size,
      originalname: savedFile.originalname,
      mimetype: savedFile.mimetype,
      filename: savedFile.filename
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
