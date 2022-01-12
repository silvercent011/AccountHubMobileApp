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
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import StudentCard from "../../components/StudentCard.vue";
import unidecode from "unidecode";
export default defineComponent({
  setup() {
    const typeAheadQuery = ref("");

    const store = useStore();
    const filtered = computed(() => {
      if (typeAheadQuery.value != "") {
        return store.state.students.filter((student: any) => {
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
        return {};
      }
    });

    return { typeAheadQuery, filtered };
  },
  components: { StudentCard },
});
</script>
