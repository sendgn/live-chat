import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import WelcomeView from '../views/WelcomeView.vue';

// auth guard
const requireAuth = (to, from, next) => {
  const { user } = useUserStore();
  if (!user) {
    next({ name: 'welcome' });
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: () => import('../views/ChatRoomView.vue'),
      beforeEnter: requireAuth
    }
  ]
});

export default router;
