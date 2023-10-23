<template>
  <LanguageSwitcher />
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import { useUserStore } from './stores/userStore';
import LanguageSwitcher from './components/LanguageSwitcher.vue';

export default {
  setup() {
    const userStore = useUserStore();
    onMounted(() => {
        userStore.setUser();
    });
  },
  components: { LanguageSwitcher }
}
</script>