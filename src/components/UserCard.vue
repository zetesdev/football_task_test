<template>
  <h1>Add User</h1>
  <div class="flex">
    <h2>First Name</h2>
    <input
      type="text"
      placeholder="first name placeholder"
      class="bg-gray-200"
    />
    <h2>Last name</h2>
    <input
      type="text"
      placeholder="last name placeholder"
      class="bg-gray-200"
    />

    <router-link to="/" class="bg-green-500">back</router-link>
  </div>
  <div>
    <img
      src="https://reqres.in/img/faces/7-image.jpg"
      alt="should be avatar"
      class="w-10 h-10 rounded-full mr-4"
    />
    <button class="bg-gray-300">change photo</button>
  </div>
</template>
