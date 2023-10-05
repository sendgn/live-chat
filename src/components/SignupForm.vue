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
    <button>Sign up</button>
  </form>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const {
      displayName,
      email,
      password,
      error,
    } = storeToRefs(userStore);

    const handleSubmit = () => {
      userStore.signup(displayName.value, email.value, password.value);
    }

    return { displayName, email, password, error, handleSubmit };
  }
}
</script>
