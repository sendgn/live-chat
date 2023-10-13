<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="email"
      required
      :placeholder="$t('login_form.email_placeholder')"
      v-model="email"
    >
    <input
      type="password"
      required
      :placeholder="$t('login_form.password_placeholder')"
      v-model="password"
    >
    <div class="error">{{ error }}</div>
    <button :disabled="loading">
      <span v-if="loading" class="spin"></span>
      <span v-else>{{ $t('login_form.button') }}</span>
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
    const { error, loading } = storeToRefs(userStore);

    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      await userStore.login(email.value, password.value);
      if (!error.value) {
        context.emit('login');
      }
    }

    return { email, password, error, loading, handleSubmit };
  }
}
</script>
