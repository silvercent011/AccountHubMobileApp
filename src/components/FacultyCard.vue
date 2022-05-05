<script lang="ts" setup>
import { useRouter } from "vue-router";
import Card from "./Card.vue";

const props = defineProps({ faculty: { type: Object, required: true, } })
const router = useRouter()
function toFacultyPage() {
  router.push({ name: "FacultyHome", params: { id: props.faculty.cpf } })
}

</script>

<template>
  <Card @click="toFacultyPage">
    <h1 class="card-title">{{ faculty.nome }}</h1>
    <p class="card-text">Cargo: {{ faculty.jobtitle }}</p>
    <p class="card-text">E-mail: {{ faculty.email }}</p>
  </Card>
</template>
