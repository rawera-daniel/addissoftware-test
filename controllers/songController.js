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

exports.getSongStats = async (req, res) => {
  try {
    const songStats = await Song.aggregate([
      {
        $group: {
          _id: null,
          totalSongs: { $sum: 1 },
          totalArtists: { $addToSet: '$artist' },
          totalAlbums: { $addToSet: '$album' },
          totalGenres: { $addToSet: '$genre' },
        },
      },
      {
        $project: {
          _id: 0,
          totalSongs: 1,
          totalArtists: { $size: '$totalArtists' },
          totalAlbums: { $size: '$totalAlbums' },
          totalGenres: { $size: '$totalGenres' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        songStats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSongsByGenre = async (req, res) => {
  try {
    const songsByGenre = await Song.aggregate([
      {
        $group: {
          _id: '$genre',
          songCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          genre: '$_id',
          songCount: 1,
        },
      },
      {
        $sort: { songCount: -1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        songsByGenre,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
