<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      :placeholder="$t('signup_form.display_name_placeholder')"
      v-model="displayName"
    >
    <input
      type="email"
      required
      :placeholder="$t('signup_form.email_placeholder')"
      v-model="email"
    >
    <input
      type="password"
      required
      :placeholder="$t('signup_form.password_placeholder')"
      v-model="password"
    >
    <div class="error">{{ error }}</div>
    <button :disabled="loading">
      <span v-if="loading" class="spin"></span>
      <span v-else>{{ $t('signup_form.button') }}</span>
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
