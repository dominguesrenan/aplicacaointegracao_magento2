import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useAlert } from '@/scripts/components/Alert';

export const useLogin = () => {
    const store = useStore();
    const router = useRouter();
    const { showError } = useAlert();
    const loading = ref(false);

    const login = async (username: string, password: string) => {
        loading.value = true;
        try {
            // Limpa o cache de pedidos e clientes antes de salvar o novo token
            await store.dispatch('orders/clearCache');
            await store.dispatch('clientes/clearCache');

            const response = await fetch('/rest/V1/integration/admin/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const token = await response.text();
            localStorage.setItem('token', token.replace(/"/g, ''));

            // Agora sim, busca os clientes do novo usuário
            await store.dispatch('clientes/fetchClientes', {
                page: 1,
                pageSize: 200,
                sortField: 'created_at',
                sortDirection: 'DESC',
            });

            await router.push('/dashboard');
        } catch (error) {
            showError('Erro ao fazer login. Verifique suas credenciais.');
            console.error('Login error:', error);
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        try {
            // Limpa o cache de pedidos ao fazer logout
            await store.dispatch('orders/clearCache');
            // Limpa o cache de clientes ao fazer logout
            await store.dispatch('clientes/clearCache');
            localStorage.removeItem('token');
            await router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return {
        loading,
        login,
        logout,
    };
};
