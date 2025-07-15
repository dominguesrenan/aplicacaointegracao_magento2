<template>
    <div class="login-container">
        <form @submit.prevent="handleSubmit" class="login-form">
            <div class="login-header">
                <h2>Sistema de Relatórios</h2>
                <p class="subtitle">Faça login para acessar o painel</p>
            </div>

            <div class="form-group">
                <label for="username">Usuário</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="username"
                        v-model="form.username"
                        required
                        autocomplete="username"
                        placeholder="Digite seu usuário"
                    />
                </div>
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <div class="input-wrapper">
                    <input
                        type="password"
                        id="password"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                        placeholder="Digite sua senha"
                    />
                </div>
            </div>

            <button type="submit" :disabled="loading">
                <span v-if="!loading">Entrar</span>
                <span v-else class="loading-spinner"></span>
            </button>
        </form>

        <Alert
            :show="!!error"
            type="error"
            title="Erro de Login"
            message="O login da conta estava incorreto ou sua conta está desativada temporariamente. Por favor, espere e tente novamente mais tarde."
            @close="clearError"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Alert from '@/components/Alert.vue';
import { Store } from 'vuex';
import { StoreState } from '@/types';

export default defineComponent({
    name: 'LoginPage',
    components: {
        Alert,
    },
    setup() {
        const store = useStore<StoreState>();
        const router = useRouter();
        const form = {
            username: '',
            password: '',
        };

        const loading = computed(() => store.getters.loading);
        const error = computed(() => store.getters.error);

        const handleSubmit = async () => {
            const success = await store.dispatch('login', form);
            if (success) {
                router.push('/dashboard');
            }
        };

        const clearError = () => {
            store.commit('SET_ERROR', null);
        };

        return {
            form,
            loading,
            error,
            handleSubmit,
            clearError,
        };
    },
});
</script>

<style lang="scss" scoped>
@use '../../../scss/auth/Login.scss' as *;
</style>
