<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    }
})
</script>

<template>
        <div class="btn">
            <RouterLink :to="route">
                    <h1>{{ name }}</h1>
            </RouterLink>
        </div>
</template>
    