import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import store from "../store/index"
import Messages from "../views/Messages.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/feed"
  },
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuthenticated) {
        next();
      } else {
        router.push({ name: 'dashboard' })
      }
    },
    meta: {
      title: "SocialX - New Generation Social Media Platform"
    }
    // beforeRouteUpdate: (to, from, next) => {
    //   if (store.state.isAuthenticated) {
    //     next();
    //   } else {
    //     router.push({name: 'dashboard'})
    //   }
    // }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "LOGIN | SocialX | Connect to the world"
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      title: "SIGNUP to SocialX to start sharing"
    }
  },
  {
    path: '/feed',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: "Home | SocialX - New Generation Social Media Platform"
    }
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: Profile,
    props: true,
    // meta: {
    //   title: ""
    // },
    beforeEnter: (to, from, next) => {
      let title = to.name;
      const keys = Object.keys(to.params);
      if (keys.length) {
        title = `${to.params[keys[0]]} on SocialX`;
      }
      document.title = title;
      next();
    }
  },
  {
    path: "/messages/",
    name: 'messages',
    component: Messages
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  next();

});


export default router;
