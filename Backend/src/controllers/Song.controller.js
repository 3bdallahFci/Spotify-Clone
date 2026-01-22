import Song from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSongById = async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const featuredSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMadeForYouSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            { $sample: { size: 10 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
        ]);
        return res.status(200).json(songs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const getTrendingSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            { $sample: { size: 10 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
        ]);
        return res.status(200).json(songs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
