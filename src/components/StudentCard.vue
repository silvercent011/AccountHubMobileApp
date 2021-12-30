<template>
  <Card @click="toStudentPage">
    <h1 class="card-title">{{ student.nome }}</h1>
    <p class="card-text">Matrícula: {{ student.matricula }}</p>
    <p class="card-text">E-mail: {{ student.email }}</p>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";
export default defineComponent({
  components: { Card },
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    function toStudentPage(){
      router.push({name: "StudentHome", params: {id: props.student.matricula}})
    }

    return {toStudentPage}
  },
});
</script>