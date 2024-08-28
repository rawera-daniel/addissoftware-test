const express = require('express');
const { createSong } = require('../controllers/songController');

const router = express.Router();

router.route('/').post(createSong);

module.exports = router;
