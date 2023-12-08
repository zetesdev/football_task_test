<template>
  <div class="">
    <h1 class="text-3xl">User List</h1>
    <div class="bg-white rounded-md p-5 mt-5">
      <div class="py-7">
        <input
          type="text"
          placeholder="Search for users"
          class="bg-gray-100 p-1"
        />
        <router-link
          :to="`/edit/${encodeURIComponent('Add User')}`"
          class="bg-green-600 rounded-full p-1 text-white"
          >+ Add User</router-link
        >
      </div>
      <ul class="">
        <li class="ml-20 font-semibold flex">
          <h2>Full Name</h2>
          <h2>Action</h2>
        </li>
        <li
          v-for="user in paginatedUsers"
          :key="user.id"
          class="flex p-1.5 items-center"
        >
          <img
            :src="user.avatar"
            alt="should be avatar"
            class="w-10 h-10 rounded-full"
          />
          <h2 class="ml-10">{{ user.first_name }} {{ user.last_name }}</h2>
          <!-- actions to the right -->
          <div>
            <router-link
              :to="`/edit/${encodeURIComponent(user.id)}`"
              class="bg-green-500"
              >edit</router-link
            >
            <button class="bg-red-500" @click="deleteUser(user.id)">
              delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- pagination -->
  <div class="bg-white p-2 mt-4 inline-block">
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
