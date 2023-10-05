import { defineStore } from 'pinia';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: null,
    displayName: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  }),
  actions: {
    async signup(displayName, email, password) {
      this.loading = true;
      try {
        const res = await createUserWithEmailAndPassword(
          auth, email, password
        );
        if (!res) {
          throw new Error('Could not complete the signup');
        }
        await updateProfile(res.user, { displayName });
        this.user = res.user;
        this.error = null;
        console.log('User signed up');
      } catch (err) {
        this.error = err.message;
      }
      this.loading = false;
    },
    async login(email, password) {
      this.loading = true;
      try {
        const res = await signInWithEmailAndPassword(
          auth, email, password
        );
        if (!res) {
          throw new Error('Could not complete the signup');
        }
        this.user = res.user;
        this.error = null;
        console.log('User logged in');
      } catch (err) {
        this.error = 'Incorrect login credentials';
        console.log(err.message);
      }
      this.loading = false;
    }
  }
});
