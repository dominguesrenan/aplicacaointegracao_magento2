import { defineComponent, computed, ref } from 'vue';

const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref<'error' | 'success' | 'warning' | 'info'>('error');

export const useAlert = () => {
    const showError = (message: string) => {
        alertMessage.value = message;
        alertType.value = 'error';
        showAlert.value = true;
    };

    const showSuccess = (message: string) => {
        alertMessage.value = message;
        alertType.value = 'success';
        showAlert.value = true;
    };

    const hideAlert = () => {
        showAlert.value = false;
    };

    return {
        showAlert,
        alertMessage,
        alertType,
        showError,
        showSuccess,
        hideAlert,
    };
};

export default defineComponent({
    name: 'Alert',
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: 'Atenção',
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'error',
            validator: (value: string) => ['error', 'success', 'warning', 'info'].includes(value),
        },
        buttonText: {
            type: String,
            default: 'OK',
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const iconClass = computed(() => ({
            'fa-exclamation-circle': props.type === 'error',
            'fa-check-circle': props.type === 'success',
            'fa-exclamation-triangle': props.type === 'warning',
            'fa-info-circle': props.type === 'info',
        }));

        const onClose = () => {
            emit('close');
        };

        const onOverlayClick = () => {
            emit('close');
        };

        return {
            iconClass,
            onClose,
            onOverlayClick,
        };
    },
});
