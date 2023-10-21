import { createRouter, createWebHistory, RouterView } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import WelcomeView from '../views/WelcomeView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import Tr from '../i18n/translation';

// auth guard
const requireAuth = (to, from, next) => {
  const { user } = useUserStore();
  if (!user) {
    next({ name: 'welcome' });
  } else {
    next();
  }
}

// welcome guard
const requireNoAuth = (to, from, next) => {
  const { user } = useUserStore();
  if (user) {
    next({ name: 'chatroom' });
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [
        {
          path: '',
          name: 'welcome',
          component: WelcomeView,
          beforeEnter: requireNoAuth
        },
        {
          path: 'chatroom',
          name: 'chatroom',
          component: () => import('../views/ChatroomView.vue'),
          beforeEnter: requireAuth
        },
        {
          path: ':pathMatch(.*)*',
          component: NotFoundView
        }
      ]
    }
  ]
});

export default router;
