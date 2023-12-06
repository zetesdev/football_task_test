<template>
  <div class="bg-gray-200 h-screen">
    <h1>{{ panel }}</h1>
    <div class="bg-white">
      <!-- inputs card -->
      <div class="flex">
        <h2>First Name</h2>
        <input
          type="text"
          placeholder="first name placeholder"
          class="bg-gray-100"
        />
        <h2>Last name</h2>
        <input
          type="text"
          placeholder="last name placeholder"
          class="bg-gray-100"
        />
        <router-link to="/" class="bg-green-500">{{ action }}</router-link>
        <router-link to="/" class="bg-yellow-300"
          >TEMPORARY BACK BUTTON</router-link
        >
      </div>
      <!-- avatar card -->
      <div>
        <img
          src="https://reqres.in/img/faces/7-image.jpg"
          alt="should be avatar"
          class="w-20 h-20 rounded-full mr-4"
        />
        <button class="bg-gray-300">change photo</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect, onMounted } from 'vue';

import { useUserStore } from '@/stores/user.js';

const props = defineProps({
  cardType: String,
});

const panel = props.cardType !== 'Add User' ? 'Edit User' : 'Add User';
const action = props.cardType !== 'Add User' ? 'Update Details' : 'Add User';

const userStore = useUserStore();

console.log(action);
// console.log(userStore.users);

// const selectedUser = userStore.users.find(
//   (user) => user.id.toString() === props.cardType
// );

// console.log(selectedUser);
</script>
