import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicState {
  songs: Song[];
  albums: Album[];
  currentAlbum?: Album;
  isLoading: boolean;
  error: string | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;
  fetchAlbums: () => Promise<void>;
  fetchAlbumsById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicState>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  stats: { totalAlbums: 0, totalArtists: 0, totalSongs: 0, totalUsers: 0 },
  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Failed to fetch albums",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumsById: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message || "Failed to fetch album" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Failed to fetch featured songs",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message || "Failed to fetch made for you songs",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Failed to fetch trending songs",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message || "Failed to fetch songs" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error:any) {
      set({ error: error.response.data.message || "Failed to fetch stats" });
    }
    finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.delete(`admin/delete-album/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
      }))
      toast.success("Album deleted successfully");
        } catch (error: any) {
      set({ error: error.response.data.message || "Failed to delete album" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/delete-song/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},
  
}));
