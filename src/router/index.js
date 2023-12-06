import { createRouter, createWebHashHistory } from 'vue-router';

import UserListView from '@/views/UserListView.vue';
import AddUserView from '@/views/AddUserView.vue';

const routes = [
  { path: '/', name: 'UserListView', component: UserListView },
  {
    path: '/edit',
    name: 'AddUserView',
    component: AddUserView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

export default router;
