const multer = require('multer');
const path = require('path');
const fs = require('fs');

const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'video/quicktime'];
const maxSizeMB = 50;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {



  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Allowed types: ' + allowedFileTypes.join(', ')), false);
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    console.log('File size exceeds limit!'); 
    return cb(new Error(`File size exceeds the allowed limit of ${maxSizeMB}MB`), false);
  }

  cb(null, true);
};





const upload = multer({ storage, fileFilter });

module.exports = upload;

























// // multerConfig.js
// const multer = require('multer');

// const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'video/quicktime'];
// const maxSizeMB = 100;

// const storage = multer.memoryStorage();

// const limits = {
//   fileSize: maxSizeMB * 1024 * 1024, // Convert MB to Bytes
// };

// const fileFilter = (req, file, cb) => {
//   if (!allowedFileTypes.includes(file.mimetype)) {
//     return cb(new Error('Invalid file type. Allowed types: ' + allowedFileTypes.join(', ')), false);
//   }

//   if (file.size > limits.fileSize) {
//     console.log('File size exceeds limit!');
//     return cb(new Error(`File size exceeds the allowed limit of ${maxSizeMB}MB`), false);
//   }

//   cb(null, true);
// };

// const upload = multer({ storage, fileFilter, limits });

// module.exports = upload;
