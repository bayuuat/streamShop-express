const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/products', index);
router.post('/products', create);

module.exports = router;
