<template>
  <nav>
    <div>
      <p>Hey there... display name here</p>
      <p class="email">Currently logged in as... email</p>
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
    const { error, loading } = storeToRefs(userStore);

    const handleClick = async () => {
      await userStore.logout();
      if (!error.value) {
        console.log('123');
      }
    }

    return { error, loading, handleClick };
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