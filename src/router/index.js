import { createRouter, createWebHashHistory } from 'vue-router';

import UserView from '@/views/UserView.vue';

const routes = [{ path: '/', name: 'UserView', component: UserView }, {}];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

export default router;
