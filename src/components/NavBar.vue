<template>
  <nav v-if="user">
    <div>
      <div>
        <p>{{ $t('navbar.greetings') }} <b>{{ user.displayName }}</b></p>
        <p class="email">
          {{ $t('navbar.logged_in_as') }} <b>{{ user.email }}</b>
        </p>
        <p class="num-participants">
          {{ $t('navbar.num_participants', users.size) }}
        </p>
      </div>
    </div>
    <button @click="handleClick" :disabled="loading">
      <span v-if="loading" class="spin"></span>
      <span v-else>{{ $t('navbar.button') }}</span>
    </button>
  </nav>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import getCollection from '../composables/getCollection';

export default {
  setup() {
    const userStore = useUserStore();
    const { users } = getCollection('messages');

    const {
      user, error, loading
    } = storeToRefs(userStore);

    const handleClick = async () => {
      await userStore.logout();
    }

    return { user, error, loading, handleClick, users };
  }
}
</script>

<style>
nav {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
.num-participants {
  margin-top: 9px;
  margin-bottom: 0;
  padding-top: 6px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #bbb;
}
</style>