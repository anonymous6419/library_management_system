const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
  });
  
  const File = mongoose.model('File', fileSchema);
  
  module.exports = File;