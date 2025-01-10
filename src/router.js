import {createRouter, createWebHistory} from "vue-router";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import MyImages from "./pages/MyImages.vue";
import Upload from "./pages/Upload.vue";
import {useUserStore} from "./stores/user.js";
import DefaultLayout from "./components/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "/", name: "Home", component: Upload },
      { path: "/images", name: "MyImages", component: MyImages },
    ],
    beforeEnter: async (to, from, next) => {
      try {
        const userStore = useUserStore();
        await userStore.fetchUser();
        next();
      } catch (error) {
        console.error('Failed to fetch data:', error);
        next(false); // Cancel navigation if data fetching fails
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore(); // Initialize the Pinia store
//
//   if (to.meta.auth && !userStore.token) {
//     next({ name: "Login" });
//   } else if (userStore.token && to.meta.guest) {
//     next({ name: "Home" });
//   } else {
//     next();
//   }
// });

export default router;