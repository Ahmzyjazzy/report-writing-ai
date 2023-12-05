<script setup>
import { onBeforeMount, onMounted, onUpdated, ref } from "vue"
import { useResearchStore } from './stores/research'

const store = useResearchStore()

// dom elements
const elemResponseTextAbstract = ref(null)
const elemCusourResponseTextAbstract = ref(null)

function fetchAbstract() {
  if (!store.projectTopic) return alert('Enter project topic')
  store.responseTextAbstract = ''
  store.loading = true
  store.fetchAbstract(elemResponseTextAbstract.value, store.projectTopic, elemCusourResponseTextAbstract.value)
}

onBeforeMount(() => {
  console.log(elemResponseTextAbstract.value)
  //this hook runs before component is rendered && print null

})

onMounted(() => {
  console.log(elemResponseTextAbstract.value)
  //print the element
})

onUpdated(() => {
  console.log(elemResponseTextAbstract.value)
  //print the element
})

</script>

<template>

  <header class="shadow-lg border-b border-gray-300 min-h-[64px] grid place-content-center mb-10">
    <h1 class="text-center">Report Writing Assistant</h1>
  </header>

  <section class="mx-auto max-w-2xl mb-10">
    <h1 class="text-center text-7xl font-normal font-garamond mb-5">Supercharge Your Next Research Paper</h1>
    <h5 class="text-center text-xl font-inter text-dark-body">Do hours worth of research in minutes</h5>
  </section>
  
  <section class="mx-auto max-w-xl py-10">
    <div>
        <label for="project-topic" class="text-xl block mb-2 font-medium text-gray-900 dark:text-white">
          What is Your Approved Project Topic
        </label>
        <textarea 
          v-model="store.projectTopic"
          id="message" 
          rows="3" 
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Write your thoughts here...">
        </textarea>
        <button 
          :disabled="store.loading"
          @click="fetchAbstract"
          type="submit" 
          class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{ store.loading ? 'Loading, please wait' : 'Generate Abstract' }}
        </button>
    </div>

    <div class="mt-10 grid" v-if="store.responseTextAbstract">
      <h3 class="text-xl font-semibold">Abstract</h3>
      <p>
        {{ store.responseTextAbstract }}
      </p>
      <button 
        :disabled="store.loading"
        @click="store.fetchChapterOne()"
        type="submit" 
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ store.loading ? 'Loading, please wait' : 'Generate Chapter-One' }}
      </button>
    </div>

    <div class="mt-10" v-if="store.responseTextChapterOne">
      <h3 class="text-xl font-semibold">Chapter One</h3>
      <p>
        {{ store.responseTextChapterOne }}
      </p>
      <button 
        :disabled="store.loading"
        @click="store.fetchLiteratureReview()"
        type="submit" 
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ store.loading ? 'Loading, please wait' : 'Generate Literature' }}
      </button>
    </div>

     <div class="mt-10" v-if="store.responseTextLiterature">
        <h3 class="text-xl font-semibold">Chapter One</h3>
        <p>
          {{ store.responseTextLiterature }}
        </p>
      </div>

  </section>

</template>

<style scoped>
</style>
