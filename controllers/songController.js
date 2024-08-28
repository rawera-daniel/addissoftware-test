const Song = require('../models/songModel');

exports.createSong = async (req, res) => {
  try {
    const newSong = await Song.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        song: newSong,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.status(200).json({
      status: 'success',
      results: songs.length,
      data: {
        songs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        song,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
