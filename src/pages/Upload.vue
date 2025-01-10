<script setup>
import {PhotoIcon} from '@heroicons/vue/24/solid'
import axiosClient from "../axios.js";
import {ref} from "vue";
import router from "../router.js";

const form = ref({
  photo: null,
  label: ""
});

const errors = ref({
  photo: [],
  label: []
});

function upload() {
  const formData = new FormData();
  formData.append("photo", form.value.photo);
  formData.append("label", form.value.label);
  axiosClient.post("/api/image", formData)
    .then(response => {
      console.log(response.data);
      router.push({name: 'MyImages'});
    })
    .catch(error => {
      errors.value = error.response.data.errors
    });
}
</script>

<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Upload</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <form @submit.prevent="upload">
        <div class="mb-4">
          <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Image</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <PhotoIcon class="mx-auto size-12 text-gray-300" aria-hidden="true" />
              <div class="mt-4 flex text-sm/6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload"
                         name="file-upload"
                         type="file"
                         @change="form.photo = $event.target.files[0]"
                         class="sr-only" />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <p class="text-sm mt-2 text-red-500">{{ errors.photo?.length > 0 ? errors.photo[0] : "" }}</p>
        </div>
        <div class="mb-4">
          <label for="label" class="block text-sm font-medium text-gray-700">Label</label>
          <input type="text"
                 id="label"
                 name="label"
                 v-model="form.label"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <p class="text-sm mt-2 text-red-500">
            {{ errors.label?.length > 0 ? errors.label[0] : "" }}
          </p>
        </div>
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>

</style>