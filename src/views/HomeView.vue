<script setup>
import { ref, reactive } from 'vue'

const projectTopic = ref('Design and Implementation of Biometric Attendance for Examination')

const researchCriterias = reactive({
  abstract: false,
  introduction: {
    enabled: false,
    detail: {
      backgroundOfStudy: false,
      statementOfProblem: false,
      objectives: false,
      significance: false,
      scope: false,
      organisation: false
    }
  }

})

</script>

<template>
  <main class="pt-5 tw-bg-red-900">
    
    <v-form @submit.prevent>
      <v-container>
        <v-row>

          <v-col
            cols="12"
            sm="6"
          >
            <h3 class="py-5 font-semibold text-2xl">What is your research about?</h3>
            <p class="pb-5 text-sm">Describe the project you want to research about. Your description should be atleast 5 words.</p>
            <v-textarea
              v-model="projectTopic"
              label="Research Topic"
              variant="outlined"
              no-resize
              rows="2"
            ></v-textarea>
          </v-col>

        </v-row>
      </v-container>

      <v-container>
          <v-row>

            <v-col
              cols="12"
              sm="6"
            >
              <h3 class="py-5 font-semibold text-2xl">What would like to generate?</h3>
              <p class="pb-5 text-sm">Describe the project you want to research about. Your description should be atleast 5 words.</p>
              
              <v-checkbox
                v-model="researchCriterias.introduction"
                :label="`Introduction${researchCriterias.introduction.toString()}`"
              ></v-checkbox>
              

              <v-checkbox label="Checkbox"></v-checkbox>
              
            </v-col>

          </v-row>
        </v-container>
    </v-form>

  </main>
</template>
