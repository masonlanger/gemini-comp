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
                <a :href="`/${route}`">
                    <h1>{{ name }}</h1>
                </a>
        </div>
</template>
    