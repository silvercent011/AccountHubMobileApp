<script lang="ts" setup>
//Vue
import { useRoute, useRouter } from "vue-router";
//Capacitor
import { App } from "@capacitor/app";
//Components
import ProvisionamentoCard from "../components/ProvisionamentoCard.vue";
import { iFaculty, useFacultyStore } from "../stores/faculty";
import { iDistribution, useDistributionStore } from "../stores/distribution";


const teacherStore = useFacultyStore()
const distributionStore = useDistributionStore()

const thisRoute = useRoute();
const facultyInfo: iFaculty = <iFaculty>teacherStore.teachers.find((faculty: any) => {
  if (faculty.cpf === thisRoute.params.id) {
    return faculty;
  }
});
const distribution: iDistribution = <iDistribution>distributionStore.distribution.find((faculty: any) => {
  if (faculty.cpf === thisRoute.params.id) {
    return faculty;
  }
});

const router = useRouter();
function voltar() {
  router.back();
}

App.addListener('backButton', ({ canGoBack }) => {
  if (canGoBack) {
    voltar()
  }
})

</script>
<script lang="ts">
  export default {
    name: 'FacultyPage',
  }
</script>
<template>
  <div>

    <button @click="voltar" class="fixed w-12 h-12 bg-ah-medium-blue top-auto left-2 rounded-full shadow-2xl">
      <i :class="`text-ah-darken-blue fas fa-chevron-left fa-xl text-2xl`"></i>
    </button>
    <div class="animate__slideInRight flex page-darken w-full">
      <div class="w-full">
        <div class="mx-auto p-8 pt-16 text-white bg-ah-darken-blue rounded-t-3xl">
          <h1 class="card-title">{{ facultyInfo.nome }}</h1>
          <p class="card-text">Cargo: {{ facultyInfo.jobtitle }}</p>
          <p class="card-text">E-mail: {{ facultyInfo.email }}</p>
          <p class="card-text">Registro: {{ facultyInfo.created }}</p>
          <p class="card-text">Atualizado: {{ facultyInfo.updated }}</p>
        </div>
      </div>

      <div class="w-full" v-if="distribution">
        <div class="mx-auto p-8 text-white bg-ah-darken-blue rounded-t-3xl">
          <h1 class="font-fredoka text-3xl">Provisionamento</h1>
          <ProvisionamentoCard :distribution="distribution" />
        </div>
      </div>

    </div>
  </div>
</template>