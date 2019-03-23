import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
      redirect: 'dashboard',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('./components/Dashboard.vue'),
        },
        {
          path: 'consul',
          name: 'consultation',
          component: () => import('./components/Consultation.vue'),
        },
        {
          path: 'career',
          name: 'career',
          component: () => import('./components/Career.vue'),
        },
        {
          path: 'college',
          name: 'college',
          component: () => import('./components/College.vue'),
        },
        {
          path: 'consulchat',
          name: 'consulchat',
          component: () => import('./components/ConsulChat.vue'),
        },
        {
          path: 'consul-off',
          name: 'consul-off',
          component: () => import('./components/Cns_Off.vue'),
        },
        {
          path: 'consul-off-bayar',
          name: 'consul-off-bayar',
          component: () => import('./components/Cns_Off_Pay.vue'),
          props: true,
        },
        {
          path: 'dashboard-admn',
          name: 'dashboard-admn',
          component: () => import('./components/comp-admn/Dashboard_admn.vue'),
        },
        {
          path: 'data-offline',
          name: 'data-offline',
          component: () => import('./components/comp-admn/Cns_OffData.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Home" */ './views/Login.vue'),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/login-admin',
      name: 'login-admin',
      component: () => import(/* webpackChunkName: "Home" */ './views/Login_admin.vue'),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "Home" */ './views/Register.vue'),
      meta: {
        requiresGuest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Check for requered of guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
