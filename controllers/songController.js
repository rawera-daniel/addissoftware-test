const Song = require('../models/songModel');
const catchAsync = require('../utils/catchAsync');

exports.createSong = catchAsync(async (req, res) => {
  const newSong = await Song.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      song: newSong,
    },
  });
});

exports.getAllSongs = catchAsync(async (req, res) => {
  const songs = await Song.find();

  res.status(200).json({
    status: 'success',
    results: songs.length,
    data: {
      songs,
    },
  });
});

exports.updateSong = catchAsync(async (req, res) => {
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
});

exports.deleteSong = catchAsync(async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getSongStats = catchAsync(async (req, res) => {
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
});

const getSongsByField = catchAsync(async (field, res, dataLabel) => {
  const songsByField = await Song.aggregate([
    {
      $group: {
        _id: `$${field}`,
        songCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        [field]: '$_id',
        songCount: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      [dataLabel]: songsByField,
    },
  });
});

exports.getSongsByGenre = (req, res) =>
  getSongsByField('genre', res, 'songsByGenre');

exports.getSongsAndAlbumsByArtist = catchAsync(async (req, res) => {
  const songsAndAlbumsByArtist = await Song.aggregate([
    {
      $group: {
        _id: '$artist',
        songCount: { $sum: 1 },
        albumCount: { $addToSet: '$album' },
      },
    },
    {
      $project: {
        _id: 0,
        artist: '$_id',
        songCount: 1,
        albumCount: { $size: '$albumCount' },
      },
    },
    {
      $sort: { artist: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      songsAndAlbumsByArtist,
    },
  });
});

exports.getSongsByAlbum = (req, res) =>
  getSongsByField('album', res, 'songsByAlbum');
