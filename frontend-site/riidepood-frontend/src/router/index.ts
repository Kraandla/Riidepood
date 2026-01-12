import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
    component: () => import('../views/CreateUpdateProductView.vue')
  },
  {
    path: '/editProduct/:itemID',
    name: 'editProduct',
    component: () => import('../views/CreateUpdateProductView.vue'),
    props: route => {return{seekID: String(route.params.itemID)}}
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;