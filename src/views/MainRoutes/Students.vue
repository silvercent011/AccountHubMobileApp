<script lang="ts" setup>
import { computed, ref } from "vue";
import StudentCard from "../../components/StudentCard.vue";
import unidecode from "unidecode";
import { iStudent, useStudentsStore } from "../../stores/students";
const typeAheadQuery = ref("");

const studentStore = useStudentsStore()
const filtered = computed<Array<iStudent>>(function (): Array<iStudent> {
  if (typeAheadQuery.value != "") {
    return studentStore.students.filter((student: any) => {
      if (
        (unidecode(student.nome)
          .toLowerCase()
          .includes(unidecode(typeAheadQuery.value.toLowerCase())) &&
          typeAheadQuery.value != "" &&
          typeAheadQuery.value.length > 2) ||
        student.matricula.includes(typeAheadQuery.value.toLowerCase())
      ) {
        return student;
      }
    });
  } else {
    return [];
  }
});

</script>


<template>
  <div class="w-full">
    <header class="h-20 top-0 z-50">
      <div class="fixed w-full px-3">
        <input class="full" placeholder="Buscar Alunos" type="text" v-model="typeAheadQuery" />
      </div>
    </header>
    <div class="mx-auto" v-if="filtered.length > 0">
      <StudentCard v-for="student in filtered" :key="student.matricula" :student="student" />
    </div>
    <div v-else class="mx-auto w-full">
      <div class="card">
        <div>
          <h1 class="card-title">
            <i :class="`fas fa-search fa-xl`"></i>&nbsp;&nbsp;&nbsp;&nbsp;Utilize o campo de busca acima para encontrar alunos.
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>