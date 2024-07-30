<script setup>
const props = defineProps({
    notebook: {
        type: Object,
        required: true
    },
    zIndex: {
        type: Number,
        default: 1,
        required: true
    
    }
})

function onThumbnailClick() {
    window.open('http://localhost:3030/?' + props.notebook.id, "_blank");
}

</script>





<template>
    <div class="notebook-thumbnail rounded" :style="{ 'z-index': zIndex }">
        <div class="notebook-thumbnail--flex" @click="onThumbnailClick">
            <div class="items-center space-x-1 text-gray-700">
                <font-awesome-icon class="fa-8x" :icon="['fas', 'book-open']" />
                <br/>
                <h2 class="notebook-thumbnail--title">{{ notebook.title }}</h2>
            </div>
        </div>
    </div>
</template>