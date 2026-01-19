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

  //product routes
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductViews/ProductsView.vue')
  },
  {
    path: '/products/:itemID',
    name: 'singleProduct',
    component: () => import('../views/ProductViews/SingleProductView.vue'),
    props: route => {return{seekID: String(route.params.itemID)}}
  },
  {
    path: '/newProduct',
    name: 'newProduct',
    component: () => import('../views/ProductViews/CreateUpdateProductView.vue')
  },
  {
    path: '/editProduct/:itemID',
    name: 'editProduct',
    component: () => import('../views/ProductViews/CreateUpdateProductView.vue'),
    props: route => {return{seekID: String(route.params.itemID)}}
  },

  //order routes
    {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrderViews/OrdersView.vue')
  },
  {
    path: '/orders/:itemID',
    name: 'singleOrder',
    component: () => import('../views/OrderViews/SingleOrderView.vue'),
    props: route => {return{seekID: String(route.params.itemID)}}
  },
  {
    path: '/newOrder',
    name: 'newOrder',
    component: () => import('../views/OrderViews/CreateUpdateOrderView.vue')
  },
  {
    path: '/editOrder/:itemID',
    name: 'editOrder',
    component: () => import('../views/OrderViews/CreateUpdateOrderView.vue'),
    props: route => {return{seekID: String(route.params.itemID)}}
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;