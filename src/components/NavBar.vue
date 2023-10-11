<template>
  <nav v-if="user">
    <div>
      <p>Hey there <b>{{ user.displayName }}</b></p>
      <p class="email">Currently logged in as <b>{{ user.email }}</b></p>
    </div>
    <button @click="handleClick" :disabled="loading">
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
      user, error, loading
    } = storeToRefs(userStore);

    const handleClick = async () => {
      await userStore.logout();
    }

    return { user, error, loading, handleClick };
  }
}
</script>

<style>
nav {
  padding: 20px;
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