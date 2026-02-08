import { axiosInstance } from '@/lib/axios';
import type { Album, Song } from '@/types';
import {create} from 'zustand';

interface MusicState {
    songs: Song[];
    albums: Album[];
    currentAlbum?: Album;
    isLoading: boolean;
    error: string | null;
    fetchAlbums: () => Promise<void>;
    fetchAlbumsById: (id: string) => Promise<void>;
}


export const useMusicStore = create<MusicState>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    error:null,

    fetchAlbums: async () => {
        set({isLoading:true});
        try {
            const response = await axiosInstance.get('/albums');
            set({albums: response.data});
        } catch (error: any) {
            set({error: error.response.data.message || "Failed to fetch albums", isLoading:false});
        }
        finally {
            set({isLoading:false});
        }
    },

    fetchAlbumsById: async (id: string) => {
        set({isLoading:true});
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({currentAlbum: response.data});
        } catch (error: any) {
            set({error: error.response.data.message || "Failed to fetch album"});
        }
        finally {
            set({isLoading:false});
        }
    },
}));