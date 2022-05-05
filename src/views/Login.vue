<script lang="ts" setup>
import { reactive } from "vue";
import { version } from "../../package.json";
//Capacitor
import { App } from "@capacitor/app";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
const store = useUserStore();
const loginData = reactive({
  login: "",
  password: "",
});

function doLogin() {
  store.doSignIn(loginData.login, loginData.password);
}

const route = useRoute()
const router = useRouter();
App.addListener('backButton', ({ canGoBack }) => {
  if (route.name === 'Login') {
    App.exitApp()
  } else {
    router.back()
  }
})

</script>
<script lang="ts">
  export default {
    name: 'Login',
  }
</script>
<template>
  <div class="page select-none mx-auto p-5">
    <div class="logo w-80 mx-auto">
      <h1 class="font-roboto font-light text-2xl">Meridian</h1>
      <h1 class="font-fredoka text-4xl">Account Hub</h1>
    </div>

    <div class="mx-auto w-80 p-5">
      <form @submit.prevent="doLogin" class="flex flex-col flex-grow">
        <h1 class="font-roboto font-light text-xl">Faça login abaixo utilizando as credenciais da plataforma Meridian.</h1>
        <input v-model="loginData.login" placeholder="CPF" type="text" id="login" />
        <input v-model="loginData.password" placeholder="Senha" type="password" id="password" />
        <button class="actionButton">Entrar</button>
      </form>
    </div>

    <div class="flex w-80 flex-col mx-auto">
      <h1 class="font-roboto text-center font-light text-xl">
        Meridian Account Hub
        <br />
        v{{ version }}, {{ new Date().getFullYear() }},
        Sidney Alex
        <br />Código aberto sob licença do MIT
      </h1>
    </div>
  </div>
</template>