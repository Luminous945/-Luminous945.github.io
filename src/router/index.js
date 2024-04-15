import VueRouter from "vue-router";
import Login from "../Login.vue";
import Leader from "../pages/Leader.vue";
import AddStu from "../pages/AddStu.vue";
import StuList from "../pages/StuList.vue";
import LateRecord from "../pages/LateRecord.vue";
import ProxySign from "../pages/ProxySign.vue";
import UpdateTime from "../pages/UpdateTime.vue";
import SignRecord from "../pages/SignRecord.vue";
import Admin from "../pages/Admin.vue";
import LogInfo from "../pages/LogInfo.vue";

const router = new VueRouter({
  duplicateNavigationPolicy: "ignore",
  routes: [
    {
      name: "login",
      path: "/Login",
      component: Login,
    },

    {
      name: "leader",
      path: "/Leader",
      component: Leader,
      children: [
        {
          name: "addstu",
          path: "/AddStu",
          component: AddStu,
        },
        {
          name: "stulist",
          path: "/StuList",
          component: StuList,
        },
        {
          name: "updatetime",
          path: "/UpdateTime",
          component: UpdateTime,
        },
        {
          name: "laterecord",
          path: "/LateRecord",
          component: LateRecord,
        },
        {
          name: "proxysign",
          path: "/ProxySign",
          component: ProxySign,
        },
        {
          name: "signRecord",
          path: "/SignRecord",
          component: SignRecord,
        },
        {
          name: "logInfo",
          path: "/LogInfo",
          component: LogInfo,
        },
        {
          name: "admin",
          path: "/Admin",
          component: Admin,
        },
      ],
    },
  ],
});

export default router;
