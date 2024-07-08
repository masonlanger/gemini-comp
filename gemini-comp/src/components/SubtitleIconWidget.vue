<script setup>
const props = defineProps({
    subtitle: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="flex flex-row items-center space-x-4">
        <font-awesome-icon class="fa-2x" :icon="['fas', props.icon]" />
        <h3 v-if="subtitle" class="tpw--subtitle">{{ props.subtitle }}</h3>
    </div>
</template>