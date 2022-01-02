<template>
<div>

  <button @click="voltar" class="fixed w-12 h-12 bg-ah-medium-blue top-2 left-2 rounded-full shadow-2xl">
      <i :class="`text-ah-darken-blue fas fa-chevron-left fa-xl text-2xl`"></i>
  </button>
  <div class="animate__slideInRight flex page-darken w-full">
    <div class="w-full">
      <img
        class="w-full object-cover -mb-20"
        :src="`${photoUrl}${studentInfo.matricula}.jpg`"
        alt=""
        srcset=""
      />
    </div>
    <div class="w-full">
      <div class="mx-auto p-8 pt-16 text-white bg-ah-darken-blue rounded-t-3xl">
        <h1 class="card-title">{{ studentInfo.nome }}</h1>
        <p class="card-text">Matrícula: {{ studentInfo.matricula }}</p>
        <p class="card-text">Turma: {{ studentInfo.turma }}</p>
        <p class="card-text">Turno: {{ studentInfo.turno }}</p>
        <p class="card-text">Registro: {{ studentInfo.created }}</p>
        <p class="card-text">Atualizado: {{ studentInfo.updated }}</p>
      </div>
    </div>

    <div class="w-full" v-if="distribution">
      <div class="mx-auto p-8 text-white bg-ah-darken-blue rounded-t-3xl">
        <h1 class="font-fredoka text-3xl">Provisionamento</h1>
        <ProvisionamentoCard :distribution="distribution" />
      </div>
    </div>
    
    <div class="w-full" v-if="services">
      <div class="mx-auto p-8 text-white bg-ah-darken-blue rounded-t-3xl">
        <h1 class="font-fredoka text-3xl">Serviços</h1>
        <ServiceCard v-for="(ser,index) in services" :key="index" :service="ser" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
//Vue
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
//Capacitor
import { App } from "@capacitor/app";
//Components
import ProvisionamentoCard from "../components/ProvisionamentoCard.vue";
import ServiceCard from "../components/ServiceCard.vue";

export default defineComponent({
  name: "StudentPage",
    setup() {
        const store = useStore();
        const thisRoute = useRoute();
        const studentInfo = store.state.students.find((aluno: any) => {
            if (aluno.matricula === thisRoute.params.id) {
                return aluno;
            }
        });
        const distribution = store.state.distribution.find((aluno: any) => {
            if (aluno.matricula === thisRoute.params.id) {
                return aluno;
            }
        });
        
        const services = store.state.services.filter((aluno: any) => {
            if (aluno.matricula === thisRoute.params.id) {
                return aluno;
            }
        });
        const router = useRouter();
        function voltar() {
            router.back();
        }

        App.addListener('backButton', ({canGoBack}) => {
          if (canGoBack) {
            voltar()
          }
        })

        const photoUrl = computed(() => {
          return import.meta.env.VITE_PHOTO_URL
        })

        return { studentInfo, distribution, services, voltar, photoUrl };
    },
    components: { ProvisionamentoCard, ServiceCard }
});
</script>

<style>
</style>