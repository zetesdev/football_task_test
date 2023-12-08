import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoaded: false,
    users: [],
  }),
  actions: {
    ////////////////////TO DO REQRES API CALLS////////////////////////
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },

    updateFirstName(userId, newFirstName) {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].first_name = newFirstName;
      }
    },
    updateLastName(userId, newLastName) {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].last_name = newLastName;
      }
    },
    addUser(newFirstName, newLastName, userAvatar) {
      const newId =
        this.users.length > 0
          ? Math.max(...this.users.map((u) => u.id)) + 1
          : 1;

      const newUser = {
        id: newId,
        first_name: newFirstName,
        last_name: newLastName,
        avatar: userAvatar,
      };

      this.users.push(newUser);
    },
  },
});
