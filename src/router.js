import Vue from 'vue';
import VueRouter from 'vue-router';

import TodoList from './components/TodoList';
import Detail from './components/Detail';

Vue.use(VueRouter);

const routes = [
  { path: '/list', component: TodoList },
  { path: '/details/:id', component: Detail },
  { path: '*', redirect: '/list' },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
