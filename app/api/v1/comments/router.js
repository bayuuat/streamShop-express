const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/comments', index);
router.post('/comments', create);

module.exports = router;
