<template>
  <form @submit.prevent="handleSubmit">
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
      <span v-else>Log in</span>
    </button>
  </form>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const { email, password, error, loading } = storeToRefs(userStore);

    const handleSubmit = () => {
      userStore.login(email.value, password.value);
    }

    return { email, password, error, loading, handleSubmit };
  }
}
</script>
