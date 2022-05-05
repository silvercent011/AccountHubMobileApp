<script lang="ts" setup>
import { Storage } from '@capacitor/storage';
import { useRouter } from 'vue-router'

const router = useRouter()
function sair() {
    Storage.remove({ key: 'token' })
    router.replace({ name: "Login" })
}

</script>

<template>
    <div class="p-5 w-full">
        <button @click="sair" class="actionButton w-full"> Sair </button>
    </div>
</template>

