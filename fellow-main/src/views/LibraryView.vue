<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import NotebookContainer from '../components/NotebookContainer.vue'
    import InspirationContainer from '../components/InspirationContainer.vue'
    import { ref } from 'vue';


    const calloutView = ref('Notebooks');
    function toggleCallout(callout) {
        calloutView.value = callout;
    }
</script>

<template>
    <div class="home">
        <div class="row space-x-4 w-full justify-left">
                <div @click="toggleCallout('Notebooks')" v-if="calloutView == 'Notebooks'" class="border-bottom p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Notebooks</span>
                </div>
                <div @click="toggleCallout('Notebooks')" v-else class="p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Notebooks</span>
                </div>

                <div @click="toggleCallout('Inspirations')" v-if="calloutView == 'Inspirations'" class="border-bottom p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Inspirations</span>
                </div>
                <div @click="toggleCallout('Inspirations')" v-else class="p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Inspirations</span>
                </div>
            </div>
        <br />
        <div class="row mb-2" v-if="calloutView === 'Notebooks'">
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
        <div class="row mb-2" v-if="calloutView === 'Inspirations'">
            <Suspense>
                <InspirationContainer />
                <template #fallback>
                    <!--Code for skeleton rendering goes here-->
                    <!-- Dummy notebook thumbnail -->
                    Loading...
                </template>
            </Suspense>
        </div>
    </div>
</template>