<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import { useUserStore } from './stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.setUser();
    });
  }
}
</script>