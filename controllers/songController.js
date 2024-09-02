const Song = require('../models/songModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSong = catchAsync(async (req, res, next) => {
  const newSong = await Song.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      song: newSong,
    },
  });
});

exports.getAllSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find();

  res.status(200).json({
    status: 'success',
    results: songs.length,
    data: {
      songs,
    },
  });
});

exports.updateSong = catchAsync(async (req, res, next) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!song) {
    return next(new AppError('No song found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      song,
    },
  });
});

exports.deleteSong = catchAsync(async (req, res, next) => {
  const song = await Song.findByIdAndDelete(req.params.id);

  if (!song) {
    return next(new AppError('No song found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getSongStats = catchAsync(async (req, res, next) => {
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

const getSongsByField = catchAsync(async (field, res, dataLabel, next) => {
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

exports.getSongsByGenre = (req, res, next) =>
  getSongsByField('genre', res, 'songsByGenre');

exports.getSongsAndAlbumsByArtist = catchAsync(async (req, res, next) => {
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

exports.getSongsByAlbum = (req, res, next) =>
  getSongsByField('album', res, 'songsByAlbum');
