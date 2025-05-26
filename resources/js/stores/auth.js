import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getError: (state) => state.error,
    isAdmin: (state) => state.user?.role === 'ADMIN'
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post('/login', credentials);
        const { data } = response.data;

        this.token = data.token;
        this.user = {
          name: data.name,
          role: data.role
        };

        localStorage.setItem('token', data.token);

        return Promise.resolve(response.data);
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue';
        return Promise.reject(error);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await axios.post('/logout');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      } finally {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
      }
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
      }
    }
  }
});
