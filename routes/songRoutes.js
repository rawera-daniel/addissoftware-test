const express = require('express');
const {
  createSong,
  getAllSongs,
  updateSong,
  deleteSong,
  getSongStats,
} = require('../controllers/songController');

const router = express.Router();

router.route('/song-stats').get(getSongStats);

router.route('/').get(getAllSongs).post(createSong);

router.route('/:id').patch(updateSong).delete(deleteSong);

module.exports = router;
