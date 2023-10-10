<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { timestamp } from '../firebase/config';

export default {
  setup() {
    const userStore = useUserStore();
    const { displayName } = userStore;

    const message = ref('');

    const handleSubmit = async () => {
      const chat = {
        name: displayName,
        message: message.value,
        createdAt: timestamp
      }

      console.log(chat);
      message.value = '';
    }

    return { message, handleSubmit };
  }
}
</script>

<style scoped>
  form {
    margin: 10px;
    align-items: unset;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
    padding: 10px 10px 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
  }
</style>
