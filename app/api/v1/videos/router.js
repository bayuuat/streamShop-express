const express = require('express');
const router = express();
const upload = require('../../../middlewares/multer');
const { create, index, find, update, destroy } = require('./controller');

router.get('/videos', index);
router.post('/videos', upload.single('thumbnail'), create);

module.exports = router;
