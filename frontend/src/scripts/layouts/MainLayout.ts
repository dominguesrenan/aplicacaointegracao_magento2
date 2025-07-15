import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export const useMainLayout = () => {
    const store = useStore();
    const router = useRouter();
    const isSidebarCollapsed = ref(false);

    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    const logout = async () => {
        await store.dispatch('logout');
        router.push('/login');
    };

    return {
        isSidebarCollapsed,
        toggleSidebar,
        logout,
        isLoggedIn,
    };
};
