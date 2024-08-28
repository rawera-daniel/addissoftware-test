const express = require('express');
const { createSong, getAllSongs } = require('../controllers/songController');

const router = express.Router();

router.route('/').get(getAllSongs).post(createSong);

module.exports = router;
