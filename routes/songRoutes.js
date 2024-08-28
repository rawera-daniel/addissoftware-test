const express = require('express');
const {
  createSong,
  getAllSongs,
  updateSong,
  deleteSong,
} = require('../controllers/songController');

const router = express.Router();

router.route('/').get(getAllSongs).post(createSong);

router.route('/:id').patch(updateSong).delete(deleteSong);

module.exports = router;
