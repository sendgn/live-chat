<template>
  <div class="welcome container">
    <div v-if="showLogin">
      <h2>Login</h2>
      <LoginForm @login="enterChat" />
      <p>No account yet?
        <span @click="switchForm">Sign up</span> instead
      </p>
    </div>
    <div v-else>
      <h2>Signup</h2>
      <SignupForm @signup="enterChat" />
      <p>Already registered?
        <span @click="switchForm">Log in</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const showLogin = ref(true);

    const switchForm = () => {
      showLogin.value = !showLogin.value;
      userStore.$reset();
    }

    const enterChat = () => {
      router.push({ name: 'chatroom' });
    }

    return { showLogin, switchForm, enterChat };
  }
}
</script>

<style scoped>
  .welcome {
    text-align: center;
    padding: 20px 0;
  }
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    margin: 20px 0 10px;
  }
  .welcome span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .welcome span:hover {
    text-decoration: none;
  }
  .welcome p {
    font-size: 0.9em;
    margin-top: 20px;
  }
</style>
