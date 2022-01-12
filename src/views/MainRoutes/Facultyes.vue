<template>
  <div class="w-full">
    <header class="h-20 top-0 z-50">
      <div class="fixed w-full px-3">
        <input class="full" placeholder="Buscar Professores" type="text" v-model="typeAheadQuery" />
      </div>
    </header>
    <div class="mx-auto" v-if="filtered.length > 0">
      <FacultyCard v-for="faculty in filtered" :key="faculty.cpf" :faculty="faculty" />
    </div>
    <div v-else class="mx-auto w-full">
      <div class="card">
        <div>
          <h1 class="card-title">
            <i :class="`fas fa-search fa-xl`"></i>&nbsp;&nbsp;&nbsp;&nbsp;Utilize o campo de busca acima para encontrar professores.
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import FacultyCard from "../../components/FacultyCard.vue";
import unidecode from "unidecode";
export default defineComponent({
  setup() {
    const typeAheadQuery = ref("");

    const store = useStore();
    const filtered = computed(() => {
      if (typeAheadQuery.value != "") {
        return store.state.teachers.filter((teacher: any) => {
          if (
            (unidecode(teacher.nome)
              .toLowerCase()
              .includes(unidecode(typeAheadQuery.value.toLowerCase())) &&
              typeAheadQuery.value != "" &&
              typeAheadQuery.value.length > 2) ||
            teacher.cpf.includes(typeAheadQuery.value.toLowerCase())
          ) {
            return teacher;
          }
        });
      } else {
        return {};
      }
    });

    return { typeAheadQuery, filtered };
  },
  components: { FacultyCard },
});
</script>
