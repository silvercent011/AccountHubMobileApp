<template>
  <div class="page-lighten mainPage">
    <div class="w-full mx-auto mb-24">
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <BottomNavBar />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import BottomNavBar from "../components/BottomNavBar.vue";
export default {
  components: { BottomNavBar },
  setup() {
    const store = useStore();
    store.dispatch("getEnabledStudents");
    store.dispatch("getTeachers");
    store.dispatch("getDistributions");
    store.dispatch("getServices");
  },
};
</script>

<style scoped>
.mainPage {
  @apply place-content-between;
}
</style>