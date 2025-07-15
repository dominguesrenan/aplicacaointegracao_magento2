<template>
    <div v-if="deferredPrompt" class="pwa-install">
        <div class="pwa-install-content">
            <h3>Instalar Aplicativo</h3>
            <p>Adicione esta aplicação à sua tela inicial para uma experiência melhor.</p>
            <button @click="installApp">Instalar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface PromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default defineComponent({
    name: 'PwaInstall',
    setup() {
        const deferredPrompt = ref<PromptEvent | null>(null);

        // Evento quando o PWA está pronto para ser instalado
        window.addEventListener('beforeinstallprompt', (e: Event) => {
            e.preventDefault();
            deferredPrompt.value = e as PromptEvent;
        });

        // Evento quando o PWA já está instalado
        window.addEventListener('appinstalled', () => {
            deferredPrompt.value = null;
        });

        const installApp = () => {
            if (!deferredPrompt.value) return;

            deferredPrompt.value.prompt();
            deferredPrompt.value.userChoice.then(choice => {
                if (choice.outcome === 'accepted') {
                    console.log('Usuário aceitou a instalação');
                } else {
                    console.log('Usuário rejeitou a instalação');
                }
                deferredPrompt.value = null;
            });
        };

        return {
            deferredPrompt,
            installApp,
        };
    },
});
</script>

<style scoped>
.pwa-install {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.pwa-install-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}

button:hover {
    background: #0056b3;
}
</style>
