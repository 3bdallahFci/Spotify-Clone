import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import cloudinary from "../utils/Cloudinary.js";
export const createSong = async (req, res) => {
  try {
    const { title, artist, album } = req.body;
    const audioFile = req.files?.audioFile;
    const imageFile = req.files?.imageFile;
    if (!audioFile || !req.files || !imageFile) {
      return res.status(400).json({ message: "Missing required files" });
    }
    // Upload audio file to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(
      audioFile.tempFilePath,
      {
        resource_type: "auto", // Cloudinary treats audio as video
        folder: "songs/audio",
      }
    );
    // Upload image file to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "songs/images",
      }
    );
    const newSong = new Song({
      title,
      artist,
      album,
      audioUrl: audioUpload.secure_url,
      audioPublicId: audioUpload.public_id,
      imageUrl: imageUpload.secure_url,
      imagePublicId: imageUpload.public_id,
    });
    await newSong.save();
    if (album) {
      const albumData = await Album.findById(album);
      if (albumData) {
        albumData.songs.push(newSong._id);
        await albumData.save();
      }
    }
    res
      .status(201)
      .json({ message: "Song created successfully", song: newSong });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    // Delete audio file from Cloudinary
    await cloudinary.uploader.destroy(song.audioPublicId);
    // Delete image file from Cloudinary
    await cloudinary.uploader.destroy(song.imagePublicId);

    if (song.album) {
      await Album.findByIdAndUpdate(song.album, { $pull: { songs: song._id } });
    }
    // Delete song from database
    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAlbum = async (req, res) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files?.imageFile;
        if (!imageFile) {
            return res.status(400).json({ message: "Missing required files" });
        }
        const imageUpload = await cloudinary.uploader.upload(
            imageFile.tempFilePath,
            {
                folder: "albums/images",
            }
        );
        const newAlbum = new Album({
            title,
            artist,
            releaseYear,
            imageUrl: imageUpload.secure_url,
            imagePublicId: imageUpload.public_id,
        });
        await newAlbum.save();
        res.status(201).json({ message: "Album created successfully", album: newAlbum });
    }
    catch (error) {
        console.error("Error creating album:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findById(id);
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        await cloudinary.uploader.destroy(album.imagePublicId);
        await Song.deleteMany({ _id: { $in: album.songs } }); // Delete all songs in the album
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting album:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAdmin = async (req, res) => {
    try {
        res.status(200).json({ Admin:true});
    } catch (error) {
        console.error("Error checking admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};