import {createRouter, createWebHistory} from "vue-router"
import Body from '../components/body';

// auth
import login from '../auth/login.vue'
import register from "../auth/register.vue";

// Report
import chart1 from "../pages/report/report1/chart1.vue"
import chart2 from "../pages/report/report2/chart2.vue"

// Log
import monitoringLog from '../pages/log/monitoringLog.vue'


// Settings
import userManagement from '../pages/settings/userManagement/userManagement.vue'
import addUser from '../pages/settings/add/addUser.vue'
import editUser from '../pages/settings/edit/editUser.vue'

import Default from '../pages/dashboard/defaultPage.vue'

const routes =[
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login page',
          component: login,
          meta: { guest: true },

        },
        {
          path: 'register',
          name: 'register',
          component: register,
          meta: { guest: true },
        }
      ]
    },
    {
        path: '/',
        component: Body,
        children: [
          {
            path: '',
            name: 'dasboard',
            component: Default,
            meta: { requiresAuth: true },
            
          },
    
        ],
      },
      {
        path:"/report",
        component:Body,
        children:[
          {
            path:"chart1",
            name:"chart1",
            component:chart1,
            meta: {
              title: "Chartist | Cuba - Premium Admin Template",
              requiresAuth: true
            },
          },
          {
            path:"chart2",
            name:"chart2",
            component:chart2,
            meta: {
              title: "Chartist | Cuba - Premium Admin Template",
              requiresAuth: true
            },
          }
        ],
      },

      // Log
      {
        path: "/log",
        component: Body,
        children: [
          {
            path: "",
            name: "logDisplay",
            component: monitoringLog,
            meta: {
              title: "Products list | Cuba - Premium Admin Template",
              requiresAuth: true
            },
          },
        ],
      },

      // Settings
      {
        path: "/settings",
        component: Body,
        children: [
          {
            path: '',
            name: "userManagement",
            component: userManagement,
            meta: {
              title: "Products list | Cuba - Premium Admin Template",
              requiresAuth: true
            },
          },
          {
            path: 'add-user',
            name: 'addUser',
            component: addUser,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'edit-user/:id',
            name: 'editUser',
            component: editUser,
            props: true,
            meta: {
              requiresAuth: true
            }
          }
        ]
      }

]
const router=createRouter({
    history: createWebHistory(),
    routes
})
// router.beforeEach((to,from, next) => {
//   if(to.meta.title)
//     document.title = to.meta.title
//   const path = ['/auth/login', '/auth/register'];
//   if(path.includes(to.path) || sessionStorage.getItem('User')){
//     return next()
//   }
//   next('/auth/login')
// })

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (sessionStorage.getItem('token')) {
      next(false);
      return;
    }
    next();
  } else {
    next();
  }
});

router.beforeEach((to,from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if(sessionStorage.getItem('token')){
      next();
      return;
    }
    next('/auth/login')
  } else {
    next();
  }
})

export default router