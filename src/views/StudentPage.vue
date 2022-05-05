<script lang="ts" setup>
//Vue
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
//Capacitor
import { App } from "@capacitor/app";
//Components
import ProvisionamentoCard from "../components/ProvisionamentoCard.vue";
import ServiceCard from "../components/ServiceCard.vue";
import { iStudent, useStudentsStore } from "../stores/students";
import { useDistributionStore } from "../stores/distribution";
import { useServicesStore } from "../stores/services";
const thisRoute = useRoute();

const studentStore = useStudentsStore();
const distributionStore = useDistributionStore()
const serviceStore = useServicesStore()

const studentInfo: iStudent = <iStudent>studentStore.students.find((aluno: any) => {
  if (aluno.matricula === thisRoute.params.id) {
    return aluno;
  }
});
const distribution = distributionStore.distribution.find((aluno: any) => {
  if (aluno.matricula === thisRoute.params.id) {
    return aluno;
  }
});

const services = serviceStore.services.filter((aluno: any) => {
  if (aluno.matricula === thisRoute.params.id) {
    return aluno;
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

const photoUrl = computed(() => {
  return import.meta.env.VITE_PHOTO_URL
})

</script>
<script lang="ts">
export default {
  name: 'StudentPage',
}
</script>
<template>
  <div>
    <button @click="voltar" class="fixed w-12 h-12 bg-ah-medium-blue top-5 left-5 rounded-full shadow-2xl z-50">
      <i :class="`text-ah-darken-blue fas fa-chevron-left fa-xl text-2xl`"></i>
    </button>
    <div class="animate__slideInRight flex flex-col md:flex-row page-darken-row w-full">
      <div class="w-full md:w-1/2 lg:w-1/3 md:fixed top-0 left-0">
        <img class="w-full object-cover -mb-20 md:h-screen" :src="`${photoUrl}${studentInfo.matricula}.jpg`" />
      </div>

      <div class="w-full md:w-1/2 lg:w-2/3 md:absolute z-30 md:right-0 lg:flex bg-ah-darken-blue rounded-t-3xl overflow-y-auto">
        <div class="w-full lg:w-1/2">
          <div class="mx-auto p-8 pt-16 text-white bg-ah-darken-blue rounded-t-3xl">
            <h1 class="card-title">{{ studentInfo.nome }}</h1>
            <p class="card-text">Matrícula: {{ studentInfo.matricula }}</p>
            <p class="card-text">Turma: {{ studentInfo.turma }}</p>
            <p class="card-text">Turno: {{ studentInfo.turno }}</p>
            <p class="card-text">Registro: {{ studentInfo.created }}</p>
            <p class="card-text">Atualizado: {{ studentInfo.updated }}</p>
          </div>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="w-full" v-if="distribution">
            <div class="mx-auto p-8 text-white bg-ah-darken-blue rounded-t-3xl">
              <h1 class="font-fredoka text-3xl">Provisionamento</h1>
              <ProvisionamentoCard :distribution="distribution" />
            </div>
          </div>

          <div class="w-full" v-if="services">
            <div class="mx-auto p-8 text-white bg-ah-darken-blue rounded-t-3xl">
              <h1 class="font-fredoka text-3xl">Serviços</h1>
              <ServiceCard v-for="(ser, index) in services" :key="index" :service="ser" />
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
