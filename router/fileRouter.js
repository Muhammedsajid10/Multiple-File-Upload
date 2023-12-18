const express = require('express');
const upload = require('../controller/multerConfig');
const authenticateToken = require('../middleware/protect');
const { uploadFiles, getFiles, deleteFile } = require('../controller/fileController');


const router = express.Router();

const middleware = [authenticateToken];



router.route('/uploads').post(middleware, upload.array('files'), uploadFiles);
router.route('/get').get(middleware, getFiles)
router.route('/dlt/:fileId').delete(middleware, deleteFile)


module.exports = router;
