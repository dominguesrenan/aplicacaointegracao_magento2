<template>
    <MainLayout>
        <router-view></router-view>
        <PwaInstall />
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import PwaInstall from './components/PwaInstall.vue';

export default {
    name: 'App',
    components: {
        MainLayout,
        PwaInstall,
    },
};
</script>

<style>
/* Reset CSS global */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    background-color: #1a237e;
    min-height: 100vh;
}

#app {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
}
</style>
