import { create } from "zustand";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASEURL;

const authStoreManagement = create((set) => ({
  loading: false,
  error: null,

  login: async (body) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(baseUrl + "/auth/login", body);
      return response?.data?.data;
    } catch (error) {
      set({ error: error?.response?.data?.message });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => {
    set({ loading: false, error: null });
  }
}));

export default authStoreManagement;