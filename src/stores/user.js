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

    updateFirstName() {
      //some tests
      const randomLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );
      if (this.users.length > 2 && this.users[2]) {
        this.users[2].first_name = randomLetter;
      }

      console.log(this.users[2].first_name);
    },
  },
});
