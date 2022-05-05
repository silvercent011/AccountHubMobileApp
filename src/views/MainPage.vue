<script lang="ts" setup>
import BottomNavBar from "../components/BottomNavBar.vue";
import { useDistributionStore } from "../stores/distribution";
import { useFacultyStore } from "../stores/faculty";
import { useServicesStore } from "../stores/services";
import { useStudentsStore } from "../stores/students";

const studentStore = useStudentsStore()
studentStore.getEnabledStudents()
const teacherStore = useFacultyStore()
teacherStore.getTeachers()
const distributionStore = useDistributionStore()
distributionStore.getDistributions()
const serviceStore = useServicesStore()
serviceStore.getServices()
</script>

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

<style scoped>
.mainPage {
  @apply place-content-between;
}
</style>