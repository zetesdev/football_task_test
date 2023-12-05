<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id" class="flex items-center">
        <img :src="user.avatar" alt="should be avatar" />
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>
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
</script>
