import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import type { CustomerSearchParams } from '@/services/magentoService';

export const useClienteList = () => {
    const store = useStore();
    const currentPage = ref(1);
    const pageSize = ref(200);
    const email = ref('');
    const name = ref('');

    const fetchClientes = async () => {
        const params: CustomerSearchParams = {
            page: currentPage.value,
            pageSize: pageSize.value,
            email: email.value || undefined,
            name: name.value || undefined,
            sortField: 'created_at',
            sortDirection: 'DESC',
        };
        await store.dispatch('clientes/fetchClientes', params);
    };

    const handlePageChange = (page: number) => {
        currentPage.value = page;
        fetchClientes();
    };

    const handleSearch = (emailSearch?: string, nameSearch?: string) => {
        email.value = emailSearch || '';
        name.value = nameSearch || '';
        currentPage.value = 1;
        fetchClientes();
    };

    onMounted(() => {
        if (localStorage.getItem('token')) {
            fetchClientes();
        }
    });

    return {
        customers: computed(() => store.getters['clientes/getClientes']),
        loading: computed(() => store.getters['clientes/isLoading']),
        error: computed(() => store.getters['clientes/getError']),
        totalCount: computed(() => store.getters['clientes/getTotalCount']),
        currentPage,
        pageSize,
        handlePageChange,
        handleSearch,
    };
};
