import { defineStore } from 'pinia';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile, signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: null,
    error: null,
    loading: false,
  }),
  actions: {
    setUser() {
      this.loading = true;
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
      this.loading = false;
    },
    async login(email, password) {
      this.loading = true;
      const errorText = 'Incorrect login credentials';
      try {
        const res = await signInWithEmailAndPassword(
          auth, email, password
        );
        if (!res) {
          throw new Error(errorText);
        }
        this.user = res.user;
        this.error = null;
      } catch (err) {
        this.error = errorText;
        console.log(err.message);
      }
      this.loading = false;
    },
    async signup(displayName, email, password) {
      this.loading = true;
      const errorText = 'Could not complete the signup';
      try {
        const res = await createUserWithEmailAndPassword(
          auth, email, password
        );
        if (!res) {
          throw new Error(errorText);
        }
        await updateProfile(res.user, { displayName });
        this.user = res.user;
        this.error = null;
      } catch (err) {
        this.error = errorText;
        console.log(err.message);
      }
      this.loading = false;
    },
    async logout() {
      this.loading = true;
      try {
        await signOut(auth);
        this.user = null;
        this.error = null;
      } catch (err) {
        console.log('Could not complete the logout');
        this.error = err.message; 
      }
      this.loading = false;
    }
  }
});
