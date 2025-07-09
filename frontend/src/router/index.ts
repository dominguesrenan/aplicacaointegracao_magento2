import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import PedidosList from '@/views/pedidos/PedidosList.vue';
import ClientesList from '@/views/clientes/ClientesList.vue';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/pedidos',
        name: 'Pedidos',
        component: PedidosList,
        meta: { requiresAuth: true },
    },
    {
        path: '/clientes',
        name: 'Clientes',
        component: ClientesList,
        meta: { requiresAuth: true },
    },
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !token) {
        next('/login');
    } else if (to.path === '/login' && token) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
