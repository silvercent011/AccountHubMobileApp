<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";
const props = defineProps({ student: { type: Object, required: true, }, })
const router = useRouter()
function toStudentPage() {
  router.push({ name: "StudentHome", params: { id: props.student.matricula } })
}

</script>

<template>
  <Card @click="toStudentPage">
    <h1 class="card-title">{{ student.nome }}</h1>
    <p class="card-text">Matrícula: {{ student.matricula }}</p>
    <p class="card-text">E-mail: {{ student.email }}</p>
  </Card>
</template>
