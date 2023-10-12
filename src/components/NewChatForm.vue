<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { timestamp } from '../firebase/config';
import useCollection from '../composables/useCollection';

export default {
  setup() {
    const { user } = useUserStore();
    const { error, addDocument } = useCollection('messages');

    const message = ref('');

    const handleSubmit = async () => {
      const chat = {
        name: user.displayName,
        message: message.value,
        createdAt: timestamp
      }

      await addDocument(chat);
      if (!error.value) {
        message.value = '';
      }
    }

    return { message, handleSubmit, error };
  }
}
</script>

<style scoped>
  form {
    padding: 10px;
  }
  textarea {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 10px 10px 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
  }
  .error {
    width: max-content;
    margin-left: 10px;
    padding: 2px 10px;
    border-left: 2px solid #ff94b7;
  }
</style>
