const FileModel = require('../models/fileModel');

const uploadFiles = async (req, res) => {
  try {
      const userId = req.user._id;
      const files = req.files;

      if (!files || files.length === 0) {
          return res.status(400).json({ error: 'No files provided for upload.' });
      }

      const uploadedFiles = await FileModel.create(files.map(file => ({
          userId,
          filename: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          filePath: file.path,
      })));

      res.json({ files: uploadedFiles });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// Fetch all files for a specific user
const getFiles = async (req, res) => {
  try {
    const userId = req.user._id;
    const files = await FileModel.find({ userId }, { filename: 1 });
    res.json({ files: files.map((obj)=>obj.filename) });
    console.log("getFiles : ",files.map((obj)=>obj.filename));
  } catch (error) {
    console.error("Error in getFiles:", error);
    res.status(500).json({ error: error.message });
  }
};


const deleteFile = async (req, res) => {
  try {
    const userId = req.user._id;
    const fileId = req.params.fileId;

    console.log("filee : ",fileId)
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



