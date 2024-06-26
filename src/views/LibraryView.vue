<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import NotebookContainer from '../components/NotebookContainer.vue'
</script>

<template>
    <TitleWidget title="Library" />
    <div class="row">
            <!-- <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" /> -->
            <Suspense>
                <NotebookContainer userID="xR1hwZsxzs75nIzLSlEj"/>
                <template #fallback>
                    <!--Code for skeleton rendering goes here-->
                    <!-- Dummy notebook thumbnail -->
                    Loading...
                </template>
            </Suspense>
    </div>
</template>