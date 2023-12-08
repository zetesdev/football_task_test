<template>
  <div class="bg-gray-200 h-screen">
    <h1>{{ panel }}</h1>

    <div class="bg-white">
      <!-- inputs card -->
      <div class="">
        <h2>First Name</h2>
        <input
          type="text"
          v-model="newFirstName"
          placeholder="enter first name"
          class="bg-gray-100"
        />
        <h2>Last name</h2>
        <input
          type="text"
          v-model="newLastName"
          placeholder="enter last name"
          class="bg-gray-100"
        />
        <div>
          <router-link
            to="/"
            @click="action === 'Update Details' ? updateUser() : newUser()"
            class="bg-green-500"
          >
            {{ action }}
          </router-link>
        </div>
      </div>
    </div>
    <!-- avatar card -->
    <div class="m-4 bg-white">
      <img
        :src="selectedUser ? selectedUser.avatar : DEFAULT_AVATAR"
        alt="should be avatar"
        class="w-20 h-20 rounded-full mr-4"
      />
      <button class="bg-gray-300">change photo</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js';

const props = defineProps({
  cardType: String,
});

const DEFAULT_AVATAR =
  'https://www.shareicon.net/data/128x128/2015/09/24/106423_user_512x512.png';

const panel = props.cardType !== 'Add User' ? 'Edit User' : 'Add User';
const action = props.cardType !== 'Add User' ? 'Update Details' : 'Add User';

const userStore = useUserStore();
const selectedUser = userStore.users.find(
  (user) => user.id.toString() === props.cardType
);

const newFirstName = ref('');
const newLastName = ref('');

const updateUser = () => {
  userStore.updateFirstName(selectedUser.id, newFirstName.value);
  userStore.updateLastName(selectedUser.id, newLastName.value);
};

const newUser = () => {
  userStore.addUser(newFirstName.value, newLastName.value, DEFAULT_AVATAR);
};
</script>
