<script setup>
const props = defineProps({
    subtitle: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    }
});
</script>

<template>
    <div class="flex flex-row items-center space-x-4">
        <font-awesome-icon v-if="icon" class="fa-2x" :icon="['fas', props.icon]" />
        <h3 class="tpw--subtitle">{{ props.subtitle }}</h3>
    </div>
</template>