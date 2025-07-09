<template>
    <div class="dashboard-container">
        <div v-if="clientesLoading" class="global-loading-popup">
            <div class="global-loading-content">
                <span class="loader"></span>
                <p>Carregando dados do sistema...</p>
            </div>
        </div>
        <div class="dashboard-header">
            <h1>Dashboard</h1>
            <button @click="handleLogout" class="logout-button">Sair</button>
        </div>

        <div class="dashboard-content">
            <div class="welcome-section">
                <h2>Bem-vindo, {{ username }}!</h2>
            </div>

            <div class="info-section">
                <h3>Informações da Sessão</h3>
                <p>Token: {{ maskedToken }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardScript from '../../scripts/dashboard/Dashboard';
export default DashboardScript;
</script>

<style lang="scss" scoped>
@use '../../../scss/dashboard/Dashboard.scss' as *;
@use '../../../scss/dashboard/DashboardLayout.scss' as *;

.global-loading-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.global-loading-content {
    background: #fff;
    padding: 2rem 3rem;
    border-radius: 10px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
