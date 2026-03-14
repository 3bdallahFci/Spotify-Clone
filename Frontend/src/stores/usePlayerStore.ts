import { create } from "zustand";
import { type Song } from "@/types/index";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

  initializeQueue: (songs) =>
    set({
      queue: songs,
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
      currentSong: get().currentSong || songs[0],
    }),

  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;
    const song = songs[startIndex];
    const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.title} by ${song.artist}`,
			});
		}
    set({
      queue: songs,
      currentIndex: startIndex,
      currentSong: song || null,
      isPlaying: true,
    });
  },

  setCurrentSong: (song : Song) =>
    {
        const index = get().queue.findIndex((s) => s._id === song?._id);

        const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.title} by ${song.artist}`,
			});
		}
        set({
            currentSong: song,
            currentIndex: index !== -1 ? index : get().currentIndex,
            isPlaying: true,
        });
    },

  togglePlay: () => {
    const willPlay = !get().isPlaying;
    const socket = useChatStore.getState().socket;
    const currentSong = get().currentSong;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: willPlay && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : `Idle`,
			});
		}
    set({
      isPlaying: willPlay,
    });
  },

  playNext: () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextSong = queue[nextIndex];
      const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
			});
		}
      set({
        currentIndex: nextIndex,
        currentSong: nextSong,
        isPlaying: true,
      });
    }
    else
    {
      set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
    }
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${queue[prevIndex].title} by ${queue[prevIndex].artist}`,
			});
		}
      set({
        currentIndex: prevIndex,
        currentSong: queue[prevIndex],
        isPlaying: true,
      });
    }
    else
    {
      set({ isPlaying: false });

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
}));
