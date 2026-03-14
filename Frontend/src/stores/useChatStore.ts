import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import io from "socket.io-client";
import { type User, type Message } from "@/types";
import { usePlayerStore } from "./usePlayerStore";
interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null;

  fetchUsers: (userId: string) => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (SenderId: string, ReceiverId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

const baseURL = "http://localhost:3000";


const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,
  fetchUsers: async (userId:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      set({ users: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
    console.log(userId);
    
    console.log("invoked from auth provider");

    
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.on("connect", () => {
        socket.emit("user_connected", userId);
      });

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activites", (activites: [string, string][]) => {
        set({ userActivities: new Map(activites) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnected: true });
    }
  },

  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { receiverId, senderId, content });
  },

  fetchMessages: async (SenderId:string,ReceiverId:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/messages/${SenderId}/${ReceiverId}`);
      set({ messages: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
