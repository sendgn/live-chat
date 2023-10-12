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
        // console.log('User state change. Current user is:', this.user);
      });
      this.loading = false;
    },
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
    },
    async logout() {
      this.loading = true;
      try {
        await signOut(auth);
        this.user = null;
        this.error = null;
        console.log('User logged out');
      } catch (err) {
        console.log(err.message);
        this.error = err.message; 
      }
      this.loading = false;
    }
  }
});
