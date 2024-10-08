const express = require('express');
const {
  createSong,
  getAllSongs,
  updateSong,
  deleteSong,
  getSongStats,
  getSongsByGenre,
  getSongsAndAlbumsByArtist,
  getSongsByAlbum,
} = require('../controllers/songController');

const router = express.Router();

router.route('/song-stats').get(getSongStats);
router.route('/songs-by-genre').get(getSongsByGenre);
router.route('/songs-albums-by-artist').get(getSongsAndAlbumsByArtist);
router.route('/songs-by-albums').get(getSongsByAlbum);

router.route('/').get(getAllSongs).post(createSong);
router.route('/:id').patch(updateSong).delete(deleteSong);

module.exports = router;
