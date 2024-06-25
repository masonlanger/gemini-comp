<script setup>
defineProps({
    notebook: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="notebook-thumbnail">
        <div>
            <h2 class="notebook-thumbnail--title">{{ notebook.title }}</h2>
        </div>
    </div>
</template>