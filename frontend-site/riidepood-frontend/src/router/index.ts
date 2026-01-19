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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default router;
