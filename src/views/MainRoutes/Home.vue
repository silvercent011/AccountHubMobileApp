<template>
    <div class="card">
        <h1 class="card-title">Oi, {{userData.nome.split(' ')[0]}}! :D</h1>
        <p class="card-text">Logado como {{userData.email}}</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    setup() {
        const store = useStore()
        const userData = computed(() => {
            return store.state.userData
        })

        return {userData}
    },
})
</script>
