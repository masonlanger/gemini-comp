<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import NotebookContainer from '../components/NotebookContainer.vue'
    import InspirationContainer from '../components/InspirationContainer.vue'
    import SubtitleIconWidget from '@/components/SubtitleIconWidget.vue';
</script>

<template>
    <div class="home">
        <TitleWidget title="Library" />
        <SubtitleIconWidget subtitle="Notebooks" />
        <div class="row mb-2">
            <!-- <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" /> -->
            <Suspense>
                <NotebookContainer />
                <template #fallback>
                    <!--Code for skeleton rendering goes here-->
                    <!-- Dummy notebook thumbnail -->
                    Loading...
                </template>
            </Suspense>
        </div>
        <SubtitleIconWidget subtitle="Inspirations" />
        <div class="row mb-2">
            <Suspense>
                <InspirationContainer/>
                <template #fallback>
                    <!--Code for skeleton rendering goes here-->
                    <!-- Dummy notebook thumbnail -->
                    Loading...
                </template>
            </Suspense>
        </div>
    </div>
</template>