const FileModel = require('../models/fileModel');

const uploadFiles = async (req, res) => {
  try {
    const userId = req.user.userId;
    const files = req.files.map(file => ({
      userId,
      filename: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
    }));
    const uploadedFiles = await FileModel.create(files);
    res.json({ files: uploadedFiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch all files for a specific user
const getFiles = async (req, res) => {
  try {
    const userId = req.user.userId;
    const files = await FileModel.find({ userId });
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteFile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const fileId = req.params.fileId;

    // before deleting ,check the specific file is there
    const file = await FileModel.findOne({ _id: fileId, userId });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // afer checking, the file is there, deleting  file from the database
    const fileDelete = await FileModel.findByIdAndDelete(fileId);


    res.json({ message: 'File deleted successfully', data: fileDelete });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadFiles, getFiles, deleteFile };



