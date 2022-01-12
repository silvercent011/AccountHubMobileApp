<template>
  <ElectronWindow/>
  <div class="">
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutRight" mode="out-in">
        <keep-alive :exclude="['StudentPage', 'FacultyPage', 'Login']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { StatusBar, Style } from "@capacitor/status-bar";
import ElectronWindow from "./components/ElectronWindow.vue";
export default defineComponent({
    setup() {
        onMounted(() => {
            StatusBar.setOverlaysWebView({ overlay: false });
            StatusBar.setBackgroundColor({ color: "#1A9191" });
        });
    },
    components: { ElectronWindow }
});
</script>
