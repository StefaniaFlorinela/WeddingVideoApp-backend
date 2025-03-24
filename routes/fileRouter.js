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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single("file"), validateUploadedFile, async (req, res) => {
  try {

    const newFile = new File({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        filename: req.file.filename
    });

    const savedFile = await newFile.save();
    console.log(savedFile);

    return res.status(200).json({
        id: savedFile._id,
        fieldname: savedFile.fieldname,
        path: savedFile.path,
        size: savedFile.size,
        originalname: savedFile.originalname,
        mimetype: savedFile.mimetype,
        filename: savedFile.filename,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/',  async(req, res) => {
  try{
    const allFiles = await File.find();

    if( !allFiles && allFiles.length === 0){
      return res.status(404).json({message: 'No files to display'});
    }
    return res.status(200).json(allFiles);

  } catch (e) {
      console.log(e);
      return res.status(404).json({message: 'No files to find'});
  }
})

router.get('/:id', validateUploadedFile, async (req,res) => {
  try{
    const fileId = req.params.id;
    const specificFile = await File.findById(fileId);

    if(!specificFile) {
      return res.status(404).json({message: 'Not found!'});
    }
    
    return res.status(200).json(specificFile);
  } catch (e) {
    console.log(e)
    return res.status(404).json({message: 'Not found!'});
  }
})

router.delete('/:id', validateUploadedFile, async (req, res) => {
  try{
    const fileId = req.params.id;
    const deletedFile = await File.findByIdAndDelete(fileId);
    if(!deletedFile) {
        return res.status(404).json({ message: 'File not found' });
    }
    return res.status(200).json({message: 'File deleted succesfully'});
  } catch(e) {
    console.log(e);
    res.status(404).json({message: 'File not found'})
  }
})

module.exports = router;
