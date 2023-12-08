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
        <li
          v-for="user in paginatedUsers"
          :key="user.id"
          class="flex items-center"
        >
          <!-- <li v-for="user in users" :key="user.id" class="flex items-center"> -->
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
          <button class="bg-red-500" @click="deleteUser(user.id)">
            delete
          </button>
        </li>
      </ul>
    </div>

    <div>
      <button
        @click="changePage(-1)"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        :disabled="currentPage === 1"
      >
        Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ 'font-bold': currentPage === page }"
        @click="jumpToPage(page)"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(1)"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

const deleteUser = (userId) => {
  console.log('Delete user with ID:', userId);
  userStore.deleteUser(userId);
};

//PAGINATION / TO DO - export as composable
const currentPage = ref(1);
const usersPerPage = ref(4);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage.value;
  const end = start + usersPerPage.value;
  return userStore.users.slice(start, end);
});

const changePage = (delta) => {
  const nextPage = currentPage.value + delta;
  const totalPages = Math.ceil(userStore.users.length / usersPerPage.value);
  if (nextPage >= 1 && nextPage <= totalPages) {
    currentPage.value = nextPage;
  }
};

const totalPages = computed(() => {
  return Math.ceil(userStore.users.length / usersPerPage.value);
});

const jumpToPage = (page) => {
  currentPage.value = page;
};
</script>
