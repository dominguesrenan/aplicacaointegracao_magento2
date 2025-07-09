<template>
    <div v-if="show" class="alert-overlay" @click="onOverlayClick">
        <div class="alert-container" @click.stop>
            <div class="alert-content">
                <div class="alert-icon">
                    <i class="fas" :class="iconClass"></i>
                </div>
                <div class="alert-message">
                    <h3>{{ title }}</h3>
                    <p>{{ message }}</p>
                </div>
            </div>
            <button class="alert-button" @click="onClose">
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import AlertScript from '../scripts/components/Alert';
export default AlertScript;
</script>

<style lang="scss" scoped>
@use '../../scss/components/Alert.scss' as *;
</style>
