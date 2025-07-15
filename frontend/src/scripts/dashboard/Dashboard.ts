import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Dashboard',
    setup() {
        const store = useStore();
        const router = useRouter();

        const username = computed(() => store.getters.username);
        const token = computed(() => store.getters.token);
        const maskedToken = computed(() =>
            token.value ? token.value.replace(/.(?=.{4})/g, '*') : ''
        );
        const clientesLoading = computed(() => store.getters['clientes/isLoading']);

        const handleLogout = () => {
            store.dispatch('logout');
            router.push('/login');
        };

        return {
            username,
            token,
            maskedToken,
            handleLogout,
            clientesLoading,
        };
    },
});
