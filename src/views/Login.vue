<template>
  <div class="page select-none mx-auto p-5">
    <div class="logo w-80 mx-auto">
      <h1 class="font-roboto font-light text-4xl">Meridian</h1>
      <h1 class="font-fredoka text-6xl">Account Hub</h1>
    </div>

    <div class="mx-auto w-80 p-5">
      <form @submit.prevent="doLogin" class="flex flex-col flex-grow">
        <h1 class="font-roboto font-light text-xl">
          Faça login abaixo utilizando as credenciais da plataforma Meridian.
        </h1>
        <input
          v-model="loginData.login"
          placeholder="CPF"
          type="text"
          name=""
          id="login"
        />
        <input
          v-model="loginData.password"
          placeholder="Senha"
          type="password"
          name=""
          id="password"
        />
        <button class="actionButton">Entrar</button>
      </form>
    </div>

    <div class="flex w-80 flex-col mx-auto">
      <h1 class="font-roboto text-center font-light text-xl">
        Meridian Account Hub <br>v{{ version }}, {{ new Date().getFullYear() }},
        Sidney Alex
        <br>
        Código aberto sob licença do MIT
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { useStore } from "vuex";
import { version } from "../../package.json";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const loginData = reactive({
      login: "",
      password: "",
    });
    function doLogin() {
      store.dispatch("doSignIn", loginData);
    }
    return { loginData, doLogin, version };
  },
});
</script>

<style>
</style>