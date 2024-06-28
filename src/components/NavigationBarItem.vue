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
        <div v-if="action" class="btn">
            <button @click=action>{{ name }}</button> 
        </div>
        <div v-else class="btn">
            <RouterLink :to="route">
                    <h1>{{ name }}</h1>
            </RouterLink>
        </div>
</template>
    