<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user';

const store = useUserStore()
const userData = computed(() => {
    return store.userData
})

</script>
<template>
    <div class="card">
        <h1 class="card-title">Oi, {{ userData.nome.split(' ')[0] }}! :D</h1>
        <p class="card-text">Logado como {{ userData.email }}</p>
    </div>
</template>

