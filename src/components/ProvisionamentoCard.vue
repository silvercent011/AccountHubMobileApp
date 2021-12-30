<template>
  <div class="bg-white text-black p-5 rounded-lg my-5">
    <div class="flex flex-col">
      <h1 class="font-fredoka text-xl">{{ distribution.nome }}</h1>
      <p>E-mail: {{ distribution.email }}</p>
      <p>Senha: {{ distribution.senha }}</p>
      <br />
      <p>
        Última atualização:
        {{ new Date(distribution.updated).toLocaleDateString() }}
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
    <div class="flex-grow w-full my-2">
      <button class="w-full subActionButton" @click="resetPassword" :disabled="distribution.reset_password">Redefinir Senha</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Share } from "@capacitor/share";
import { Clipboard } from "@capacitor/clipboard";
import { Toast } from "@capacitor/toast";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    distribution: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const message = computed(() => {
      const mess = `*Olá ${
        props.distribution.nome.split(" ")[0]
      }!*\nAqui está sua nova conta institucional do colégio!\n\nE-mail: ${
        props.distribution.email
      }\nSenha provisória: ${
        props.distribution.senha
      }\n\nTutorial de entrada: ${import.meta.env.VITE_URL_SUPPORT}`;

      return mess;
    });

    async function shareMessage() {
      await Share.share({
        title: "Nova conta institucional!",
        text: message.value,
      });
    }

    function zapZapMessage() {
      window.open(`whatsapp://send?text=${message.value.replace("\n", "%0A")}`);
    }

    async function clipboardMessage() {
      await Clipboard.write({ string: message.value });
      Toast.show({text:`Copiado para a área de transferência`, position: 'bottom'});
    }

    const store = useStore()
    async function resetPassword() {
      if (!props.distribution.cpf) {
        await store.dispatch('resetStudentPassword', {id: props.distribution.matricula}).then(() => {
          props.distribution.reset_password = true
          Toast.show({text:`Solicitação de redefinição enviada com sucesso.`, position: 'bottom'});
        })
      }
      if (!props.distribution.matricula) {
        await store.dispatch('resetFacultyPassword', {id: props.distribution.cpf}).then(() => {
          props.distribution.reset_password = true
          Toast.show({text:`Solicitação de redefinição enviada com sucesso.`, position: 'bottom'});
        })
      }
    }

    return { shareMessage, zapZapMessage, clipboardMessage, resetPassword };
  },
});
</script>

<style>
</style>