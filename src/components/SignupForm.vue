<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="Display name"
      v-model="displayName"
    >
    <input
      type="email"
      required
      placeholder="Email"
      v-model="email"
    >
    <input
      type="password"
      required
      placeholder="Password"
      v-model="password"
    >
    <div class="error">{{ error }}</div>
    <button :disabled="loading">
      <span v-if="loading" class="spin"></span>
      <span v-else>Sign up</span>
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

export default {
  setup(props, context) {
    const userStore = useUserStore();
    const {
      error,
      loading
    } = storeToRefs(userStore);

    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      await userStore.signup(displayName.value, email.value, password.value);
      if (!error.value) {
        context.emit('signup');
      }
    }

    return { error, loading, displayName, email, password, handleSubmit };
  }
}
</script>
