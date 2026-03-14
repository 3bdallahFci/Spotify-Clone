import Album from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        return res.status(200).json(albums);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAlbumById = async (req, res) => {
    try {
        const { albumId } = req.params;
        const album = await Album.findById(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }
        return res.status(200).json(album);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}