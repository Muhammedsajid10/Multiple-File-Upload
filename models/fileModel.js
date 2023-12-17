const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
  filename: String,
  fileType: String,
  fileSize: Number,
  filePath: String,
});
const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;