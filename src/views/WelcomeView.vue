<template>
  <div class="welcome container">
    <div v-if="showLogin">
      <h2>Login</h2>
      <LoginForm />
      <p>No account yet?
        <span @click="showLogin = false">Signup</span> instead
      </p>
    </div>
    <div v-else>
      <h2>Signup</h2>
      <SignupForm />
      <p>Already registered?
        <span @click="showLogin = true">Login</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);

    return { showLogin };
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
