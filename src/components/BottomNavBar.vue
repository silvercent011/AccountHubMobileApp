<template>
  <ul class="bar">
    <li
      @click="toRoute(route.name)"
      class="text-center"
      :class="{ selected: verifyRouter(route.name) }"
      v-for="(route, index) in optRoutes"
      :key="index"
    >
      <i :class="`fas ${route.icon} fa-xl`"></i>
      <p>{{ route.title }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const optRoutes = reactive([
      { name: "Home", title: "Inicio", icon: "fa-home" },
      { name: "Students", title: "Alunos", icon: "fa-user-graduate" },
      { name: "Facultyes", title: "Prof.", icon: "fa-chalkboard-teacher" },
      { name: "Settings", title: "Config.", icon: "fa-cog" },
    ]);

    function verifyRouter(routerName: string) {
      if (route.name === routerName) {
        return true;
      }
    }

    function toRoute(routeName: string) {
      router.push({ name: routeName });
    }

    return { optRoutes, verifyRouter, toRoute };
  },
});
</script>

<style>
.bar {
  @apply select-none outline-none flex justify-around bg-ah-medium-blue text-ah-blue h-20 w-full items-center font-roboto font-bold;
  @apply fixed bottom-0;
  transition: all 0.2s ease;
}

.selected {
  @apply text-ah-red text-lg;
  transition: all 0.2s ease;
}
</style>
