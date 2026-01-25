import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LoginView.vue"),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue'),
     meta: { requiresGuest: true }
  },
    {
    path: '/user',
    name: 'user',
    component: () => import('../views/auth/UserView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/products/:itemID',
    name: 'singleProduct',
    component: () => import('../views/SingleProductView.vue'),
    props: route => {return{seekID: String(route.params.itemID)}}
  },
  {
    path: '/newProduct',
    name: 'newProduct',
    component: () => import('../views/CreateProductView.vue')
  },
  {
    path: '/admin/users',
    name: 'adminUsers',
    component: () => import('../views/AdminUsersView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeResolve(async (to, from, next)=>{
  const authStore = useAuthStore()

  if(to.meta.requiresAuth && !authStore.isAuthenticated){   
    return next({name: 'login', query: {redirect: to.fullPath}})
  }else if(to.meta.requiresGuest && authStore.isAuthenticated){
    return next({name: 'home'})
  }else if(to.meta.requiresAdmin && !authStore.isAdmin){
    return next({name: 'home'})
  }else{
    return next()
  }
})

export default router;
