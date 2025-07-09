import { createStore } from 'vuex';
import { magentoService } from '@/services/magentoService';
import { StoreState, LoginCredentials } from '@/types';
import { orders } from './modules/orders';
import { clientes } from './modules/clientes';

export const store = createStore<StoreState>({
    state: {
        token: localStorage.getItem('token') || null,
        username: localStorage.getItem('username') || '',
        customerInfo: null,
        loading: false,
        error: null,
    },

    getters: {
        isAuthenticated: state => !!state.token,
        username: state => state.username,
        customerInfo: state => state.customerInfo,
        loading: state => state.loading,
        error: state => state.error,
    },

    mutations: {
        SET_TOKEN(state, token: string) {
            // Antes de salvar novo token, limpa o cache
            state.token = token;
            localStorage.setItem('token', token);
        },
        SET_USERNAME(state, username: string) {
            state.username = username;
            localStorage.setItem('username', username);
        },
        SET_CUSTOMER_INFO(state, info) {
            state.customerInfo = info;
        },
        SET_LOADING(state, loading: boolean) {
            state.loading = loading;
        },
        SET_ERROR(state, error: string | null) {
            state.error = error;
        },
        CLEAR_AUTH(state) {
            state.token = null;
            state.username = '';
            state.customerInfo = null;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            // Limpa o cache de pedidos e clientes ao fazer logout
            store.dispatch('orders/clearCache');
            store.dispatch('clientes/clearCache');
        },
    },

    actions: {
        async loadInitialData({ dispatch }) {
            try {
                // Carrega os pedidos iniciais
                await dispatch(
                    'orders/fetchOrders',
                    {
                        page: 1,
                        pageSize: 200,
                        sortField: 'created_at',
                        sortDirection: 'DESC',
                    },
                    { root: true }
                );
                // Carrega os clientes iniciais
                await dispatch(
                    'clientes/fetchClientes',
                    {
                        page: 1,
                        pageSize: 200,
                        sortField: 'created_at',
                        sortDirection: 'DESC',
                    },
                    { root: true }
                );
            } catch (error) {
                console.error('Erro ao carregar dados iniciais:', error);
            }
        },

        async login({ commit, dispatch }, credentials: LoginCredentials) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                // Limpa o cache de pedidos antes do login
                await dispatch('orders/clearCache', null, { root: true });

                const response = await magentoService.login(
                    credentials.username,
                    credentials.password
                );
                if (response.success && response.token) {
                    commit('SET_TOKEN', response.token);
                    commit('SET_USERNAME', credentials.username);

                    // Carrega os dados iniciais após o login
                    await dispatch('loadInitialData');

                    return true;
                } else {
                    commit('SET_ERROR', response.error || 'Erro ao fazer login');
                    return false;
                }
            } catch (error) {
                const axiosError = error as { message?: string };
                commit('SET_ERROR', axiosError.message || 'Erro ao fazer login');
                return false;
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async validateToken({ state }) {
            if (!state.token) return false;
            return true;
        },

        async logout({ commit, dispatch }) {
            // Limpa o cache de pedidos antes do logout
            await dispatch('orders/clearCache', null, { root: true });
            commit('CLEAR_AUTH');
        },
    },

    modules: {
        orders,
        clientes,
    },
});
