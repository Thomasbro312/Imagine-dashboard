import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/components/pages/auth/Login.vue";
import Register from "@/components/pages/auth/Register.vue";
import IndexAuth from '@/components/pages/auth/authed/Index.vue';
import NotFound from "@/components/pages/NotFound.vue";
import Admin from '@/components/pages/auth/authed/Admin.vue';
import CampaignCreate from "@/components/pages/auth/authed/campaign/Create.vue";
import CampaignEdit from "@/components/pages/auth/authed/campaign/Edit.vue";
import EditUser from "@/components/pages/auth/authed/user/EditUser.vue";
import UserInfo from "@/components/pages/auth/authed/user/UserInfo.vue";
import store from "@/store";
import Widget from "@/components/pages/auth/authed/Widget.vue";
import LoggingTest from "@/components/pages/LoggingTest.vue";
import ForgotPassword from "@/components/pages/auth/forgot-password/ForgotPassword.vue";
import VerifyCode from "@/components/pages/auth/forgot-password/VerifyCode.vue";
import NewPassword from "@/components/pages/auth/forgot-password/NewPassword.vue";
import PasswordChanged from "@/components/pages/auth/forgot-password/PasswordChanged.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/test', component: LoggingTest, name: 'test'},
        {path: '/', component: Login, name: 'login', meta: { requiresUnauth: true}},
        {path: '/register', component: Register, name: 'register', meta: { requiresUnauth: true}},
        {path: '/forgot-password', component: ForgotPassword, name: 'forgot-password'},
        {path: '/password-changed', component: PasswordChanged, name: 'password-changed'},
        {path: '/new-password', component: NewPassword, name:'new-password'},
        {path: '/verify-code', component: VerifyCode, name: 'verify-code'},
        {path: '/auth/index', component: IndexAuth, name: 'auth-index', meta: { requiresAuth: true}},
        {path: '/auth/users', component: UserInfo , name: 'profile',meta: { requiresAuth: true}} ,
        {path: '/auth/users/edit', component: EditUser  , name: 'edit-user',meta: { requiresAuth: true}} ,
        {path: '/auth/admin', component: Admin, name: 'auth-admin-index' , meta: { requiresAuth: true, admin: true}},
        {path: '/auth/admin/campaign/create', component: CampaignCreate , name: 'create-campaign',meta: { requiresAuth: true, admin: true}},
        {path: '/auth/admin/campaign/:id/edit', component: CampaignEdit , name: 'edit-campaign', props: (route) => ({ id: route.params.id || null }), meta: { requiresAuth: true, admin: true}},
        {path: '/auth/campaign/:id', component: Widget , name: 'campaign-summary', props: (route) => ({ id: route.params.id || null }), meta: { requiresAuth: true}},
        {path: '/:notFound(.*)', component: NotFound}
    ]
});

// this checks if the user is authenticated
router.beforeEach(function(to,from, next){
    if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/auth/index');
    } else  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else if (to.matched.some(record => record.meta.admin)) {
        if (store.getters.role.role !== '2') {
            next('/auth/index');
        } else {
            next(); // Proceed with the route if the user is an admin
        }
    } else {
        next(); // Proceed with the route for other cases
    }
});


export default router;