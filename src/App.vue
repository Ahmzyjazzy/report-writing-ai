<script setup>
import { ref, watch, onMounted } from 'vue'
import { welcomeMessageElem, messages, displayMessages } from './vueuse/useAnimatedMessage'
import { useResearchStore } from './stores/research'
import { storeToRefs } from 'pinia'

const store = useResearchStore()

const {
  fetchAbstract,
  fetchChapterOne,
  fetchLiteratureReview
} = store

const {
  projectTopic,
  loading,
  responseTextAbstract,
  responseTextChapterOne,
  responseTextLiterature
} = storeToRefs(store)

// dom elements
const elemResponseTextAbstract = ref(null)
const elemCusourResponseTextAbstract = ref(null)

watch(responseTextAbstract, (newValue, oldValue) => {
  if(!newValue) return
  console.log(elemResponseTextAbstract.value, elemCusourResponseTextAbstract.value)
  store.writeText(elemResponseTextAbstract.value, newValue, elemCusourResponseTextAbstract.value, 0)
})

onMounted(() => {
  displayMessages(messages.value, 0);
})
</script>

<template>

  <header class=" border-gray-300 min-h-[64px] grid place-content-center mb-10 px-5">
    <h1 class="text-center italic text-3xl font-garamond">
      <span class="not-italic font-bold">kampusReport</span> 
      <sub class="text-sm">Writing Assistance</sub>
    </h1>
  </header>

  <section class="mx-auto max-w-2xl mb-10 px-5">
    <h1 class="text-center text-7xl font-normal font-garamond mb-5 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Supercharge Your Next Research Paper</h1>
    <h5 class="text-center text-xl font-inter text-dark-body" ref="welcomeMessageElem">Do hours worth of research in minutes</h5>
  </section>
  
  <section class="mx-auto max-w-xl py-10 px-5">
    <div>
        <label for="project-topic" class="text-xl block mb-2 font-medium text-gray-900 dark:text-white">
          What is Your Approved Project Topic
        </label>
        <textarea 
          v-model="projectTopic"
          id="message" 
          rows="3" 
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Write your thoughts here...">
        </textarea>
        <button 
          :disabled="loading"
          @click="fetchAbstract"
          type="submit" 
          class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{ loading ? 'Loading, please wait' : 'Generate Abstract' }}
        </button>
    </div>

    <div class="mt-10 grid">
      <h3 class="text-xl font-semibold" v-if="responseTextAbstract">Abstract</h3>
      <div class="text-container">
        <p class="text" ref="elemResponseTextAbstract"></p>
        <div class="cursor" ref="elemCusourResponseTextAbstract"></div>
      </div>
      <!-- <p>
        {{ responseTextAbstract }}
      </p> -->
      <button 
        v-if="responseTextAbstract"
        :disabled="loading"
        @click="fetchChapterOne"
        type="submit" 
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ loading ? 'Loading, please wait' : 'Generate Chapter-One' }}
      </button>
    </div>

    <div class="mt-10" v-if="responseTextChapterOne">
      <h3 class="text-xl font-semibold">Chapter One</h3>
      <p>
        {{ responseTextChapterOne }}
      </p>
      <button 
        :disabled="loading"
        @click="fetchLiteratureReview"
        type="submit" 
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ loading ? 'Loading, please wait' : 'Generate Literature' }}
      </button>
    </div>

     <div class="mt-10" v-if="responseTextLiterature">
        <h3 class="text-xl font-semibold">Chapter One</h3>
        <p>
          {{ responseTextLiterature }}
        </p>
      </div>

  </section>

</template>

<style scoped>
</style>
