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
