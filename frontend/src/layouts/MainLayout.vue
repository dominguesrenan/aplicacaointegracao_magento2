<template>
    <div class="layout-container">
        <!-- Sidebar only shows when logged in -->
        <aside
            v-if="isLoggedIn"
            class="sidebar"
            :class="{ 'sidebar-collapsed': isSidebarCollapsed }"
        >
            <div class="sidebar-header">
                <h1>Painel Administrativo</h1>
                <button @click="toggleSidebar" class="toggle-button">
                    <span class="toggle-icon">☰</span>
                </button>
            </div>

            <nav class="sidebar-nav">
                <div class="nav-section">
                    <div class="nav-title">Painel</div>
                    <router-link to="/dashboard" class="nav-item">
                        <i class="fas fa-home"></i>
                        <span class="nav-text">Dashboard</span>
                    </router-link>
                </div>
                <div class="nav-section">
                    <div class="nav-title">Operacional</div>
                    <router-link to="/pedidos" class="nav-item">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="nav-text">Pedidos</span>
                    </router-link>
                    <router-link to="/clientes" class="nav-item">
                        <i class="fas fa-users"></i>
                        <span class="nav-text">Clientes</span>
                    </router-link>
                </div>
                <div class="nav-section">
                    <div class="nav-title">Conta</div>
                    <a @click="logout" class="nav-item">
                        <i class="fas fa-sign-out-alt"></i>
                        <span class="nav-text">Sair</span>
                    </a>
                </div>
            </nav>
        </aside>

        <main class="main-content" :class="{ 'full-width': !isLoggedIn }">
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMainLayout } from '@/scripts/layouts/MainLayout';

export default defineComponent({
    name: 'MainLayout',
    setup() {
        const { isLoggedIn, isSidebarCollapsed, toggleSidebar, logout } = useMainLayout();

        return {
            isLoggedIn,
            isSidebarCollapsed,
            toggleSidebar,
            logout,
        };
    },
});
</script>

<style lang="scss" scoped>
@use '../../scss/layouts/MainLayout.scss' as *;
</style>
