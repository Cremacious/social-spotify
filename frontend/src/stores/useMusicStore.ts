import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface MusicStore {
  albums: any[];
  songs: any[];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const res = await axiosInstance.get('/albums');
      set({
        albums: res.data,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  // fetchSongs: async () => {},
}));
