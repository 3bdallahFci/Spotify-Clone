import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand'


interface ChatStore {
    fetchUsers: () => void;
    isLoading: boolean;
    users: any[];
    error: string | null;
}


export const useChatStore = create<ChatStore>((set) => ({
    isLoading: false,
    users: [],
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
        finally {
            set({ isLoading: false });
        }
    },

}))