<template>
  <div class="container">
    <NavBar />
  </div>
</template>

<script>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import NavBar from '../components/NavBar.vue';

export default {
  components: { NavBar },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    
    watch(user, () => {
      if (!user.value) {
        userStore.$reset();
        router.push({ name: 'welcome' });
      }
    });
  }
}
</script>
