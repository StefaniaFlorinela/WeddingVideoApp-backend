const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  fieldname: { type: String, required: false },  
  originalname : {type: String,require:false},
  encoding: {type: String, },
  mimetype: {type: String},    
  baseUrl: { type: String},
  url: { type: String},
  path: {type: String},
  uploadedAt: { type: Date, default: Date.now },
  originalUrl:{ type: String},
  size: { type: String } 
})

const File = mongoose.model('File', uploadSchema);

module.exports = File;