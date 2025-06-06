import { Song } from '../models/song.model.js';

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log('Error in fetching songs');
    next(error);
  }
};

export const getSongById = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    }
    res.stats(200).json(song);
  } catch (error) {
    console.log('Error in fetching songs');
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {};

export const getMadeForYouSongs = async (req, res, next) => {};

export const getTrendingSongs = async (req, res, next) => {};
