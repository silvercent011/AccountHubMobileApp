<template>
    <div style="-webkit-app-region: drag" v-if="Electron" class="bg-ah-darken-blue text-white sticky w-full flex flex-row items-center justify-between h-10 top-0 z-50">
        <h1 class="px-5">Meridian Account Hub v{{ version }}</h1>
        <div style="-webkit-app-region: no-drag;" class="flex">
            <button class="hover:bg-ah-red w-10 h-10" @click="fechar"> X </button>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import isElectron from 'is-electron';
import { version } from "../../package.json";
export default defineComponent({
    setup() {

        const Electron = computed(() => {
            // @ts-ignore
            return isElectron()
        })

        function fechar() {
            console.log('fechar')
            window.close()
        }

        return { Electron, version, fechar }
    },
})
</script>
