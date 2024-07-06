<script setup>
defineProps({
    commentStr: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="comment">{{ commentStr }}</div>
</template>