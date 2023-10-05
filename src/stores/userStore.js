import { defineStore } from 'pinia';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    displayName: '',
    email: '',
    password: '',
    error: null
  }),
  actions: {
    async signup(displayName, email, password) {
      this.error = null;
      try {
        const res = await createUserWithEmailAndPassword(
          auth, email, password
        );
        if (!res) {
          throw new Error('Could not complete the signup');
        }
        await updateProfile(res.user, { displayName });
        this.error = null;
        console.log('User signed up');
      } catch (err) {
        this.error = err.message;
        console.log(err.message)
      }
    }
  }
});
