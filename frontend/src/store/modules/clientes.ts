import { Module } from 'vuex';
import type { Customer } from '@/services/magentoService';

interface ClientesState {
    items: Customer[];
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

export const clientes: Module<ClientesState, any> = {
    namespaced: true,
    state: () => {
        const currentToken = localStorage.getItem('token');
        const cachedToken = loadFromLocalStorage('clientes_token');

        return {
            items: cachedToken === currentToken ? loadFromLocalStorage('clientes_items') || [] : [],
            totalCount:
                cachedToken === currentToken ? loadFromLocalStorage('clientes_totalCount') || 0 : 0,
            lastFetch:
                cachedToken === currentToken
                    ? loadFromLocalStorage('clientes_lastFetch') || null
                    : null,
            loading: false,
            error: null,
        };
    },
    mutations: {
        SET_CLIENTES(state, { items, totalCount }) {
            state.items = items;
            state.totalCount = totalCount;
            state.lastFetch = Date.now();
            state.error = null;

            // Salva no localStorage
            saveToLocalStorage('clientes_items', items);
            saveToLocalStorage('clientes_totalCount', totalCount);
            saveToLocalStorage('clientes_lastFetch', state.lastFetch);
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
            localStorage.removeItem('clientes_items');
            localStorage.removeItem('clientes_totalCount');
            localStorage.removeItem('clientes_lastFetch');
            localStorage.removeItem('clientes_token');
        },
    },
    actions: {
        clearCache({ commit }) {
            commit('CLEAR_CACHE');
        },
        async fetchClientes({ commit, state }, params = {}) {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            // Verifica se os dados em cache ainda são válidos
            if (state.lastFetch && Date.now() - state.lastFetch < CACHE_DURATION) {
                return;
            }

            commit('SET_LOADING', true);
            try {
                const searchParams = new URLSearchParams();
                searchParams.append('searchCriteria[pageSize]', String(params.pageSize || 200));
                searchParams.append('searchCriteria[currentPage]', String(params.page || 1));
                if (params.sortField) {
                    searchParams.append('searchCriteria[sortOrders][0][field]', params.sortField);
                    searchParams.append(
                        'searchCriteria[sortOrders][0][direction]',
                        params.sortDirection || 'DESC'
                    );
                }
                if (params.email) {
                    searchParams.append(
                        'searchCriteria[filterGroups][0][filters][0][field]',
                        'email'
                    );
                    searchParams.append(
                        'searchCriteria[filterGroups][0][filters][0][conditionType]',
                        'like'
                    );
                    searchParams.append(
                        'searchCriteria[filterGroups][0][filters][0][value]',
                        `%${params.email}%`
                    );
                }
                if (params.name) {
                    searchParams.append(
                        'searchCriteria[filterGroups][1][filters][0][field]',
                        'firstname'
                    );
                    searchParams.append(
                        'searchCriteria[filterGroups][1][filters][0][conditionType]',
                        'like'
                    );
                    searchParams.append(
                        'searchCriteria[filterGroups][1][filters][0][value]',
                        `%${params.name}%`
                    );
                }

                const url = `/rest/V1/customers/search?${searchParams.toString()}`;
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                commit('SET_CLIENTES', {
                    items: data.items,
                    totalCount: data.total_count,
                });
            } catch (error) {
                commit(
                    'SET_ERROR',
                    error instanceof Error ? error.message : 'Erro ao carregar clientes'
                );
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
    getters: {
        getClientes: state => state.items,
        getTotalCount: state => state.totalCount,
        isLoading: state => state.loading,
        getError: state => state.error,
        isCacheValid: state => {
            if (!state.lastFetch) return false;
            return Date.now() - state.lastFetch < CACHE_DURATION;
        },
    },
};
