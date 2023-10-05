import { defineStore } from 'pinia';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    displayName: '',
    email: '',
    error: null
  }),
  actions: {
    async signup(displayName, email, password) {
      this.error = null;
      try {
        const resp = await createUserWithEmailAndPassword(
          auth, email, password
        );
        if (!resp) {
          throw new Error('Could not complete the signup');
        }
        await updateProfile(resp.user, { displayName });
        this.displayName = displayName;
        this.error = null;
        console.log('User signed up');
      } catch (err) {
        this.error = err.message;
        console.log(this.error);
      }
    }
  }
});
