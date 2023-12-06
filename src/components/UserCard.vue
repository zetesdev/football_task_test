<template>
  <div class="bg-gray-200 h-screen">
    <h1>{{ cardType }}</h1>
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

        <router-link to="/" class="bg-green-500">{{ interpolate }}</router-link>
        <router-link to="/" class="bg-yellow-300"
          >TEMPORARY BACK BUTTON</router-link
        >
      </div>
      <!-- avatar card -->
      <div>
        <img
          src="https://reqres.in/img/faces/7-image.jpg"
          alt="should be avatar"
          class="w-10 h-10 rounded-full mr-4"
        />
        <button class="bg-gray-300">change photo</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect, onMounted } from 'vue';

const interpolate = 'testing interpolation';

const props = defineProps({
  cardType: String,
});

console.log(props.cardType);
// watchEffect(() => {
//   console.log(props.cardType);
// });
</script>
