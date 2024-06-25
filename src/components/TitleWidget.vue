<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    paragraph: {
        type: String,
        required: false
    }
})
</script>

<template>
    <div class="tpw">
        <h2 class="title">{{ title }}</h2>
        <h3 v-if="subtitle" class="tpw--subtitle">{{ subtitle }}</h3>
        <p v-if="paragraph" class="tpw--paragraph">{{ paragraph }}</p>
    </div>
</template>