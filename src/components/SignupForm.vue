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
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const {
      displayName,
      email,
      error,
    } = storeToRefs(authStore);

    const password = ref('');

    const handleSubmit = () => {
      authStore.signup(displayName.value, email.value, password.value);
    }

    return {
      displayName,
      email,
      error,
      password,
      handleSubmit
    };
  }
}
</script>
