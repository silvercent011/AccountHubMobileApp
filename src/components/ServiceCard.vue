<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { Share } from "@capacitor/share";
import { Clipboard } from "@capacitor/clipboard";
import { Toast } from "@capacitor/toast";
const props = defineProps({ service: { type: Object, required: true, }, })
const serviceData = computed(() => {
  const decr = JSON.parse(props.service.data);
  return {
    login: decr.login,
    senha: decr.senha,
    serviceName: props.service.serviceName,
    updated: props.service.updated,
  };
});

const message = computed(() => {
  const mess = `Segue os dados de acesso ao ${serviceData.value.serviceName
    }\n \nLogin: ${serviceData.value.login} \nSenha provisória: ${serviceData.value.senha
    }\n \nTutorial de entrada: ${import.meta.env.VITE_URL_SUPPORT}`;

  return mess;
});

async function shareMessage() {
  await Share.share({
    title: "Dados de acesso",
    text: message.value,
  });
}

function zapZapMessage() {
  window.open(`whatsapp://send?text=${message.value.replace("\n", "%0A")}`);
}

async function clipboardMessage() {
  await Clipboard.write({ string: message.value });
  Toast.show({
    text: `Copiado para a área de transferência`,
    position: "bottom",
  });
}

</script>


<template>
  <div class="bg-white text-black p-5 rounded-lg my-5">
    <div class="flex flex-col">
      <h1 class="font-fredoka text-xl">{{ serviceData.serviceName }}</h1>
      <p>Login: {{ serviceData.login }}</p>
      <p>Senha: {{ serviceData.senha }}</p>
      <br />
      <p>
        Última atualização:
        {{ new Date(serviceData.updated).toLocaleDateString() }}
      </p>
    </div>
    <div class="flex-grow w-full my-2">
      <button @click="shareMessage" class="w-full subActionButton">
        Compartilhar
      </button>
    </div>
    <div class="flex-grow w-full my-2">
      <button @click="zapZapMessage" class="w-full subActionButton">
        WhatsApp
      </button>
    </div>
    <div class="flex-grow w-full my-2">
      <button @click="clipboardMessage" class="w-full subActionButton">
        Copiar
      </button>
    </div>
  </div>
</template>
<style>
</style>