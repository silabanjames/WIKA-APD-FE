import {createRouter, createWebHistory} from "vue-router"
import Body from '../components/body';

// auth
import login from '../auth/login.vue'
import register from "../auth/register.vue";

// Report
import google_chart from "../pages/report/googleChart/google_chart"
import apex_chart from "../pages/report/ApexChart/apex_chart"
import chartist_chart from "../pages/report/chartist/chartist_chart.vue"

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
          component: login
        },
        {
          path: 'register',
          name: 'register',
          component: register
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
          },
    
        ],
      },
      {
        path:"/report",
        component:Body,
        children:[
          {
            path:"google",
            name:"googlechart",
            component:google_chart,
            meta: {
              title: "Google Chart | Cuba - Premium Admin Template",
            },
          },
          {
            path:"apexChart",
            name:"apexchart",
            component:apex_chart,
            meta: {
              title: "ApexChart | Cuba - Premium Admin Template",
            },
          },
          {
            path:"chartist",
            name:"chartist",
            component:chartist_chart,
            meta: {
              title: "Chartist | Cuba - Premium Admin Template",
            },
          },
    
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
            },
          },
          {
            path: 'add-user',
            name: 'addUser',
            component: addUser,
          },
          {
            path: 'edit-user',
            name: 'editUser',
            component: editUser,
          }
        ]
      }

]
const router=createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to,from, next) => {
  if(to.meta.title)
    document.title = to.meta.title
  const path = ['/auth/login', '/auth/register'];
  if(path.includes(to.path) || sessionStorage.getItem('User')){
    return next()
  }
  next('/auth/login')
})
export default router