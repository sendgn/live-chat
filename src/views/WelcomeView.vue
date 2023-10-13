<template>
  <div class="welcome container">
    <div v-if="showLogin">
      <h2>{{ $t('welcome_view.login_heading') }}</h2>
      <LoginForm @login="enterChat" />
      <p>{{ $t('welcome_view.login_prompt') }}
        <span @click="switchForm">{{ $t('welcome_view.login_link_text') }}
        </span> {{ $t('welcome_view.instead') }}
      </p>
    </div>
    <div v-else>
      <h2>{{ $t('welcome_view.signup_heading') }}</h2>
      <SignupForm @signup="enterChat" />
      <p>{{ $t('welcome_view.signup_prompt') }}
        <span @click="switchForm">{{ $t('welcome_view.signup_link_text') }}
        </span> {{ $t('welcome_view.instead') }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
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

<style>
.welcome {
  text-align: center;
  padding: 30px 0;
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
.welcome button span {
  text-decoration: none;
}
</style>
