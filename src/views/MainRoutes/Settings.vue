<template>
    <div class="p-5 w-full">
        <button @click="sair" class="actionButton w-full"> Sair </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        function sair() {
            router.replace({name:"Login"})
        }

        return {sair}
    },
})
</script>
