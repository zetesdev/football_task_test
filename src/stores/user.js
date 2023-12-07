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

    // updateFirstName(userId, newFirstName) {
    //     console.log(userId, newFirstName);
    //     this.users[2].first_name = newFirstName;
    //   },

    updateFirstName(userId, newFirstName) {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].first_name = newFirstName;
      }
    },
  },
});
