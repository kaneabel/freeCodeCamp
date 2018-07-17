import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Home' },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/voting',
          name: 'Voting',
          component: () => import('@/pages/Voting/Index'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
