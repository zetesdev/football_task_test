<template>
  <div class="bg-white">
    <h1 class="text-2xl">User List</h1>
    <div>
      <div>
        <input type="text" placeholder="Search for users" class="bg-gray-200" />
        <router-link
          :to="`/edit/${encodeURIComponent('Add User')}`"
          class="bg-green-500 rounded-md p-2"
          >+ Add User</router-link
        >
      </div>
      <ul>
        <li v-for="user in users" :key="user.id" class="flex items-center">
          <img
            :src="user.avatar"
            alt="should be avatar"
            class="w-10 h-10 rounded-full mr-4"
          />
          {{ user.first_name }} {{ user.last_name }} ID: {{ user.id }}
          <router-link
            :to="`/edit/${encodeURIComponent(user.id)}`"
            class="bg-green-500"
            >edit</router-link
          >
          <!-- <button class="bg-orange-500" @click="editUser(user.id)">edit</button> -->
          <button class="bg-red-500" @click="deleteUser(user.id)">
            delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user.js';

const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.isLoaded) {
    let allUsers = [];
    let currentPage = 1;
    let totalPages = 1; // initial
    while (currentPage <= totalPages) {
      const response = await fetch(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      const data = await response.json();
      allUsers = allUsers.concat(data.data);

      totalPages = data.total_pages;
      currentPage++;
    }

    userStore.users = allUsers;
    userStore.isLoaded = true;
  }
});

const users = computed(() => userStore.users);

const editUser = (userId) => {
  console.log('Edit user with ID:', userId);
};

const deleteUser = (userId) => {
  console.log('Delete user with ID:', userId);
  userStore.deleteUser(userId);
};
</script>
