<template>
  <div class="pt-3 md:pt-10">
    <h1 class="text-3xl">User List</h1>
    <div class="bg-white rounded-md p-5 mt-3 md:mt-5 shadow">
      <div class="md:flex justify-between items-center md:py-7">
        <div class="relative md:w-1/2 xl:w-1/3">
          <input
            type="text"
            placeholder="Search for users..."
            class="bg-gray-100 w-full py-1 pl-3 pr-8 rounded-md"
          />
          <font-awesome-icon
            :icon="['fas', 'search']"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
        <router-link
          :to="`/edit/${encodeURIComponent('Add User')}`"
          class="bg-green-600 rounded-full px-4 py-1 text-white ml-4 my-2 md:my-0 text-sm font-semibold flex items-center justify-center hover:scale-105 transition-transform"
          ><h2 class="text-xl mr-3 mb-1">+</h2>
          <h2>Add User</h2>
        </router-link>
      </div>
      <ul>
        <li class="flex md:flex justify-between p-1.5 font-semibold shadow">
          <h2 class="pl-14 md:pl-24">Full Name</h2>
          <h2 class="pr-10">Action</h2>
        </li>
        <li
          v-for="user in paginatedUsers"
          :key="user.id"
          class="flex md:flex justify-between p-1.5 items-center"
        >
          <div class="flex items-center">
            <img
              :src="user.avatar"
              alt="User avatar"
              class="w-10 h-10 rounded-full mr-2 md:mr-11 ml-3"
            />
            <h2>{{ user.first_name }} {{ user.last_name }}</h2>
          </div>
          <!-- Actions to the right -->
          <div class="ml-auto pr-10">
            <router-link
              :to="`/edit/${encodeURIComponent(user.id)}`"
              class="text-gray-400 hover:text-gray-500 mr-4"
            >
              <font-awesome-icon :icon="['fas', 'pen-to-square']" />
            </router-link>
            <button
              class="text-gray-400 hover:text-gray-500"
              @click="deleteUser(user.id)"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- pagination -->
  <div
    class="bg-white font-semibold rounded-sm mt-4 inline-flex text-green-600"
  >
    <button
      @click="changePage(-1)"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      :disabled="currentPage === 1"
      class="w-8 h-8 border hover:scale-105 transition-transform flex items-center justify-center"
    >
      <font-awesome-icon :icon="['fas', 'angles-left']" class="text-xs" />
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ 'bg-green-500 text-white': currentPage === page }"
      class="w-8 h-8 border hover:scale-105 transition-transform flex items-center justify-center"
      @click="jumpToPage(page)"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(1)"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
      class="w-8 h-8 border hover:scale-105 transition-transform flex items-center justify-center"
    >
      <font-awesome-icon :icon="['fas', 'angles-right']" class="text-xs" />
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

//PAGINATION / TO DO - maybe export as composable
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
