<template>
  <nav v-if="user">
    <div>
      <p>Hey there <b>{{ displayName }}</b></p>
      <p class="email">Currently logged in as <b>{{ email }}</b></p>
    </div>
    <button @click="userStore.logout()" :disabled="loading">
      <span v-if="loading" class="spin"></span>
      <span v-else>Log out</span>
    </button>
  </nav>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const {
      user, displayName, email, error, loading,
    } = storeToRefs(userStore);

    return { user, displayName, email, error, loading, userStore };
  }
}
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>