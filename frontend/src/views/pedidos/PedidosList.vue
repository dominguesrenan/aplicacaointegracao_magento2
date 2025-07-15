<template>
    <div class="pedidos-list">
        <div class="pedidos-list__header">
            <h1>Pedidos</h1>
            <div class="pedidos-list__filters">
                <select v-model="selectedStatus" @change="changeStatus(selectedStatus)">
                    <option value="all">Todos os Status</option>
                    <option value="pending">Pendente</option>
                    <option value="processing">Processando</option>
                    <option value="complete">Concluído</option>
                    <option value="canceled">Cancelado</option>
                </select>
            </div>
        </div>

        <div v-if="loading" class="pedidos-list__loading">Carregando...</div>

        <template v-else>
            <table class="pedidos-list__table">
                <thead>
                    <tr>
                        <th @click="changeSort('increment_id')">
                            ID
                            <span v-if="sortField === 'increment_id'" class="sort-icon">
                                {{ sortDirection === 'ASC' ? '↑' : '↓' }}
                            </span>
                        </th>
                        <th @click="changeSort('created_at')">
                            Data
                            <span v-if="sortField === 'created_at'" class="sort-icon">
                                {{ sortDirection === 'ASC' ? '↑' : '↓' }}
                            </span>
                        </th>
                        <th>Cliente</th>
                        <th @click="changeSort('status')">
                            Status
                            <span v-if="sortField === 'status'" class="sort-icon">
                                {{ sortDirection === 'ASC' ? '↑' : '↓' }}
                            </span>
                        </th>
                        <th @click="changeSort('grand_total')">
                            Total
                            <span v-if="sortField === 'grand_total'" class="sort-icon">
                                {{ sortDirection === 'ASC' ? '↑' : '↓' }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.entity_id">
                        <td>{{ order.increment_id }}</td>
                        <td>{{ formatDate(order.created_at) }}</td>
                        <td>{{ `${order.customer_firstname} ${order.customer_lastname}` }}</td>
                        <td>{{ order.status }}</td>
                        <td>{{ formatCurrency(order.grand_total) }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="pedidos-list__pagination">
                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                    Anterior
                </button>
                <span>Página {{ currentPage }}</span>
                <button :disabled="orders.length < 200" @click="changePage(currentPage + 1)">
                    Próxima
                </button>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePedidosList } from '@/scripts/pedidos/PedidosList';

export default defineComponent({
    name: 'PedidosList',
    setup() {
        const {
            orders,
            loading,
            currentPage,
            sortField,
            sortDirection,
            selectedStatus,
            changePage,
            changeSort,
            changeStatus,
        } = usePedidosList();

        const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString('pt-BR');
        };

        const formatCurrency = (value: number) => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(value);
        };

        return {
            orders,
            loading,
            currentPage,
            sortField,
            sortDirection,
            selectedStatus,
            changePage,
            changeSort,
            changeStatus,
            formatDate,
            formatCurrency,
        };
    },
});
</script>

<style lang="scss">
@use '../../../scss/pedidos/PedidosList.scss';
</style>
