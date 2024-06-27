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
            <font-awesome-icon class="fa-2x" :icon="['fas', 'book-open']" />
            <br/>
            <h2 class="notebook-thumbnail--title">{{ notebook.name }}</h2>
        </div>
    </div>
</template>