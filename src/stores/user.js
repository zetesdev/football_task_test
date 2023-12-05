import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoaded: false,
    users: [],
  }),
  actions: {
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
  },
});
