import { Module } from 'vuex';
import { Order } from '@/services/magentoService';

interface OrdersState {
    items: Order[];
    totalCount: number;
    lastFetch: number | null;
    loading: boolean;
    error: string | null;
}

// Tempo de cache
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

// Funções auxiliares para localStorage
const saveToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
};

const loadFromLocalStorage = (key: string) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return null;
    }
};

export const orders: Module<OrdersState, any> = {
    namespaced: true,
    state: {
        items: loadFromLocalStorage('orders_items') || [],
        totalCount: loadFromLocalStorage('orders_totalCount') || 0,
        lastFetch: loadFromLocalStorage('orders_lastFetch') || null,
        loading: false,
        error: null,
    },
    mutations: {
        SET_ORDERS(state, { items, totalCount }) {
            state.items = items;
            state.totalCount = totalCount;
            state.lastFetch = Date.now();
            state.error = null;

            // Salva no localStorage
            saveToLocalStorage('orders_items', items);
            saveToLocalStorage('orders_totalCount', totalCount);
            saveToLocalStorage('orders_lastFetch', state.lastFetch);
        },
        SET_LOADING(state, loading: boolean) {
            state.loading = loading;
        },
        SET_ERROR(state, error: string) {
            state.error = error;
            state.loading = false;
        },
        CLEAR_CACHE(state) {
            state.items = [];
            state.totalCount = 0;
            state.lastFetch = null;
            state.error = null;

            // Limpa o localStorage
            localStorage.removeItem('orders_items');
            localStorage.removeItem('orders_totalCount');
            localStorage.removeItem('orders_lastFetch');
        },
    },
    actions: {
        clearCache({ commit }) {
            commit('CLEAR_CACHE');
        },
        async fetchOrders({ commit, state }, params) {
            // Verifica se os dados em cache ainda são válidos
            if (state.lastFetch && Date.now() - state.lastFetch < CACHE_DURATION) {
                return;
            }

            commit('SET_LOADING', true);
            try {
                const response = await fetch(
                    '/rest/V1/orders?' +
                        new URLSearchParams({
                            'searchCriteria[pageSize]': String(params.pageSize || 200),
                            'searchCriteria[currentPage]': String(params.page || 1),
                            ...(params.sortField && {
                                'searchCriteria[sortOrders][0][field]': params.sortField,
                                'searchCriteria[sortOrders][0][direction]':
                                    params.sortDirection || 'DESC',
                            }),
                            ...(params.status &&
                                params.status !== 'all' && {
                                    'searchCriteria[filterGroups][0][filters][0][field]': 'status',
                                    'searchCriteria[filterGroups][0][filters][0][conditionType]':
                                        'eq',
                                    'searchCriteria[filterGroups][0][filters][0][value]':
                                        params.status,
                                }),
                        }),
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                commit('SET_ORDERS', {
                    items: data.items,
                    totalCount: data.total_count,
                });
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
                commit('SET_ERROR', errorMessage);
                throw error;
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
    getters: {
        getOrders: state => state.items,
        getTotalCount: state => state.totalCount,
        isLoading: state => state.loading,
        getError: state => state.error,
        isCacheValid: state => {
            if (!state.lastFetch) return false;
            return Date.now() - state.lastFetch < CACHE_DURATION;
        },
    },
};
