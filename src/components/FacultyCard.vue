<template>
  <Card @click="toFacultyPage">
    <h1 class="card-title">{{ faculty.nome }}</h1>
    <p class="card-text">Cargo: {{ faculty.jobtitle }}</p>
    <p class="card-text">E-mail: {{ faculty.email }}</p>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";
export default defineComponent({
  components: { Card },
  props: {
    faculty: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    function toFacultyPage(){
      router.push({name: "FacultyHome", params: {id: props.faculty.cpf}})
    }

    return {toFacultyPage}
  },
});
</script>