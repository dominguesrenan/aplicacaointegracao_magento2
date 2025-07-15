import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import type { Order, OrderSearchParams } from '@/services/magentoService';
import { useAlert } from '@/scripts/components/Alert';

export const usePedidosList = () => {
    const store = useStore();
    const currentPage = ref(1);
    const sortField = ref('created_at');
    const sortDirection = ref<'ASC' | 'DESC'>('DESC');
    const selectedStatus = ref('all');
    const { showError } = useAlert();

    const fetchOrders = async () => {
        try {
            const params: OrderSearchParams = {
                page: currentPage.value,
                pageSize: 200,
                sortField: sortField.value,
                sortDirection: sortDirection.value,
                status: selectedStatus.value,
            };
            await store.dispatch('orders/fetchOrders', params);
        } catch (error) {
            showError('Erro ao carregar pedidos. Por favor, tente novamente.');
            console.error('Error fetching orders:', error);
        }
    };

    const changePage = (page: number) => {
        currentPage.value = page;
        fetchOrders();
    };

    const changeSort = (field: string) => {
        if (sortField.value === field) {
            sortDirection.value = sortDirection.value === 'ASC' ? 'DESC' : 'ASC';
        } else {
            sortField.value = field;
            sortDirection.value = 'DESC';
        }
        fetchOrders();
    };

    const changeStatus = (status: string) => {
        selectedStatus.value = status;
        currentPage.value = 1;
        fetchOrders();
    };

    onMounted(() => {
        fetchOrders();
    });

    return {
        orders: computed(() => store.getters['orders/getOrders']),
        loading: computed(() => store.getters['orders/isLoading']),
        totalCount: computed(() => store.getters['orders/getTotalCount']),
        currentPage,
        sortField,
        sortDirection,
        selectedStatus,
        changePage,
        changeSort,
        changeStatus,
    };
};
