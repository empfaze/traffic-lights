import { createRouter, createWebHistory } from "vue-router";

import Red from "./components/Red.vue";
import Yellow from "./components/Yellow.vue";
import Green from "./components/Green.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/red" },
    { path: "/red", name: "red", component: Red },
    { path: "/yellow", name: "yellow", component: Yellow },
    { path: "/green", component: Green },
    { path: "/:notGound(.*)", redirect: "/red" },
  ],
  linkActiveClass: "active",
});

export default router;
