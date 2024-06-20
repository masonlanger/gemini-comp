<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="tpw">
        <h1 class="tpw--title">{{ title }}</h1>
        <p class="tpw--paragraph">{{ paragraph }}</p>
    </div>
</template>