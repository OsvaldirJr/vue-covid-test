import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Resume from "../views/Resume.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/resume",
    name: "resume",
    component: Resume,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
