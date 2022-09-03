import { createRouter, createWebHistory } from "vue-router";
import FreePicks from "../views/FreePicks.vue";
import ContactUs from "../views/ContactUs.vue";
import NotFound from "../views/NotFound.vue";
import Telegram from "@/views/Telegram.vue";
import LiveScores from "@/views/LiveScores.vue";
import SuperPicks from "@/views/SuperPicks.vue";

const AppName = "Community winners";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/free-picks",
    },
    {
      path: "/free-picks",
      name: "freepicks",
      component: FreePicks,
      meta: {
        title: `Free picks - ${AppName}`,
        metaTags: [
          {
            name: "description",
            content: "Free football (soccer) mathematical based predictions.",
          },
          {
            property: "og:description",
            content: "Free football (soccer) mathematical based predictions.",
          },
        ],
      },
    },
    {
      path: "/super-picks",
      name: "superpicks",
      component: SuperPicks,
      meta: {
        title: `Super picks - ${AppName}`,
        metaTags: [
          {
            name: "description",
            content: "More accurate handpicked football (soccer) mathematical based predictions, with a very high win probability.",
          },
          {
            property: "og:description",
            content: "More accurate handpicked football (soccer) mathematical based predictions, with a very high win probability.",
          },
        ],
      },
    },
    {
      path: "/contact-us",
      name: "contactus",
      component: ContactUs,
      meta: {
        title: `Contact us - ${AppName}`,
        metaTags: [
          {
            name: "description",
            content: `Get support or leave feed back with ${AppName}, with and amazing feedback.`,
          },
          {
            property: "og:description",
            content: `Get support or leave feed back with ${AppName}, with and amazing feedback.`,
          },
        ],
      },
    },
    {
      path: "/telegram",
      name: "telegram",
      component: Telegram,
      meta: {
        title: `Join us on telegram - ${AppName}`,
        metaTags: [
          {
            name: "description",
            content: `Link to the ${AppName} on telegram.`,
          },
          {
            property: "og:description",
            content: `Link to the ${AppName} on telegram.`,
          },
        ],
      },
    },
    {
      path: "/livescores",
      name: "livescores",
      component: LiveScores,
      meta: {
        title: `Livescores - ${AppName}`,
        metaTags: [
          {
            name: "description",
            content: `Upto date live scores and statistics powered by NowGoal.`,
          },
          {
            property: "og:description",
            content: `Upto date live scores and statistics powered by NowGoal.`,
          },
        ],
      },
    },
    { 
      path: "/:pathMatch(.*)*", 
      name: "NotFound", 
      component: NotFound
    },
  ],
});

// ... 

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
