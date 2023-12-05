import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoaded: false,
    users: [],
  }),
  actions: {},
});
