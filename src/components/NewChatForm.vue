<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
  </form>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { timestamp } from '../firebase/config';
import useCollection from '../composables/useCollection';

export default {
  setup() {
    const userStore = useUserStore();
    const { user } = userStore;
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
    margin: 10px;
    align-items: unset;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    padding: 10px 10px 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
  }
  .error {
    padding: 15px 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: #ff3f80;
    color: white;
  }
</style>
