const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A song must have a title'],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, 'A song must have an artist'],
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
