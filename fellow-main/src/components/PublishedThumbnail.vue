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
        <h3 class="last-updated">{{ notebook.updated.toDate().toString().substring(0,15) }}</h3>
        <div class="notebook-thumbnail--flex" @click="onThumbnailClick">
            <div class="items-center space-x-1 text-gray-700">
                <font-awesome-icon class="fa-8x" :icon="['fas', 'book-open']" />
                <br/>
                <h2 class="notebook-thumbnail--title">{{ notebook.title }}</h2>
                <h3 class="author">{{  notebook.author }}</h3>
            </div>
        </div>
    </div>
</template>