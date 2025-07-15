<template>
    <div class="clientes-container">
        <h1>Lista de Clientes</h1>

        <!-- Filtros -->
        <div class="filters">
            <div class="search-box">
                <input
                    type="text"
                    v-model="emailSearch"
                    placeholder="Buscar por email..."
                    @input="handleEmailSearch"
                />
                <input
                    type="text"
                    v-model="nameSearch"
                    placeholder="Buscar por nome..."
                    @input="handleNameSearch"
                />
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading">Carregando clientes...</div>

        <!-- Error -->
        <div v-if="error" class="error">
            {{ error }}
        </div>

        <!-- Lista de Clientes -->
        <div v-if="!loading && !error" class="clientes-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Cadastro</th>
                        <th>Última Atualização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{ customer.id }}</td>
                        <td>{{ customer.firstname }} {{ customer.lastname }}</td>
                        <td>{{ customer.email }}</td>
                        <td>{{ formatDate(customer.created_at) }}</td>
                        <td>{{ formatDate(customer.updated_at) }}</td>
                        <td>
                            <button @click="viewCustomerDetails(customer)" class="btn-view">
                                Ver Detalhes
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Paginação -->
        <div v-if="!loading && !error" class="pagination">
            <button
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)"
                class="btn-page"
            >
                Anterior
            </button>
            <span class="page-info">
                Página {{ currentPage }} de {{ Math.ceil(totalCount / pageSize) }}
            </span>
            <button
                :disabled="currentPage >= Math.ceil(totalCount / pageSize)"
                @click="handlePageChange(currentPage + 1)"
                class="btn-page"
            >
                Próxima
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useClienteList } from '@/scripts/clientes/ClienteList';

export default defineComponent({
    name: 'ClientesList',
    setup() {
        const {
            customers,
            loading,
            error,
            totalCount,
            currentPage,
            pageSize,
            handlePageChange,
            handleSearch,
        } = useClienteList();

        const emailSearch = ref('');
        const nameSearch = ref('');

        const handleEmailSearch = () => {
            handleSearch(emailSearch.value, nameSearch.value);
        };

        const handleNameSearch = () => {
            handleSearch(emailSearch.value, nameSearch.value);
        };

        const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleString('pt-BR');
        };

        const viewCustomerDetails = (customer: any) => {
            // Implementar visualização de detalhes do cliente
            console.log('Visualizar detalhes do cliente:', customer);
        };

        return {
            customers,
            loading,
            error,
            totalCount,
            currentPage,
            pageSize,
            emailSearch,
            nameSearch,
            handlePageChange,
            handleEmailSearch,
            handleNameSearch,
            formatDate,
            viewCustomerDetails,
        };
    },
});
</script>

<style lang="scss">
@use '../../../scss/clientes/ClientesList.scss';
</style>
