<script setup>
    import { useCollection } from 'vuefire'
    import TitleWidget from '../components/TitleWidget.vue'
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
</script>

<template>
    <TitleWidget title="Library" />
    <div class="row">
        <AddNewNotebook />
        <!-- <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" /> -->
        <NotebookThumbnail />
    </div>
    
</template>