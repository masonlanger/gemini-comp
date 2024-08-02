<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    action: {
        type: Function,
        required: false
    },
    route: {
        type: String,
        required: true
    }
})
</script>

<template>
        <div v-if="action" class="btn" @click=action>{{ name }}</div>
        <RouterLink v-else class="btn" :to="route">
                <h1>{{ name }}</h1>
        </RouterLink>
</template>
    