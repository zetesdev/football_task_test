<template>
  <h1 class="text-3xl pt-3 md:pt-10">{{ panel }}</h1>
  <div class="md:flex h-72 mt-3 md:mt-5">
    <!-- inputs card -->
    <div
      class="bg-white md:w-2/3 p-5 rounded-md shadow md:flex md:flex-col justify-between md:h-full"
    >
      <div class="md:flex">
        <div class="flex-1 md:pr-3">
          <h2 class="font-semibold">First Name</h2>
          <input
            type="text"
            v-model="newFirstName"
            placeholder="enter first name"
            class="bg-gray-100 mt-2 p-1 w-full border border-gray-300 rounded-sm"
          />
        </div>

        <div class="flex-1 md:pl-3">
          <h2 class="font-semibold mt-2 md:mt-0">Last Name</h2>
          <input
            type="text"
            v-model="newLastName"
            placeholder="enter last name"
            class="bg-gray-100 mt-2 p-1 w-full border border-gray-300 rounded-sm"
          />
        </div>
      </div>

      <div class="mt-5 md:mt-auto">
        <router-link
          to="/"
          @click="action === 'Update Details' ? updateUser() : newUser()"
          class="bg-green-600 text-white py-2 px-4 rounded"
        >
          {{ action }}
        </router-link>
      </div>
    </div>
    <!-- avatar card -->
    <div
      class="bg-white rounded-md md:w-1/3 p-5 mt-2 md:ml-5 md:mt-0 shadow md:flex md:flex-col items-center justify-between md:h-full"
    >
      <!-- picture -->
      <div
        class="flex md:flex md:flex-col items-center justify-center md:flex-grow"
      >
        <img
          :src="selectedUser ? selectedUser.avatar : DEFAULT_AVATAR"
          alt="User avatar"
          class="w-32 h-32 rounded-full"
        />
      </div>

      <button
        class="w-full rounded-md border border-gray-400 p-1 mt-4"
        @click="changeButtonText"
      >
        <font-awesome-icon :icon="['fas', 'camera']" />
        {{ buttonText }}
      </button>
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

const panel = props.cardType !== 'Add User' ? 'Edit User' : 'Add user';
const action = props.cardType !== 'Add User' ? 'Update Details' : 'Add user';

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

// TEMP SOLUTION TO DO BUTTOn
const buttonText = ref('Change Photo');

function changeButtonText() {
  buttonText.value =
    buttonText.value === 'Change Photo' ? 'To be implemented' : 'Change Photo';
}
</script>
