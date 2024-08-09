<script setup>
    import { ref } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, orderBy } from 'firebase/firestore';
    import { query } from 'firebase/firestore';
    import PublishedStoryContainer from '@/components/PublishedStoryContainer.vue';
    import SavedContainer from '@/components/SavedContainer.vue'
    const sort = ref("updated")

    const calloutView = ref('Library');
    function toggleCallout(callout) {
        calloutView.value = callout;
    }
</script>

<template>
    <div class="home">
        <div class="flex justify-between items-center">
            <div class="row space-x-4 w-full justify-left">
                <div @click="toggleCallout('Library')" v-if="calloutView == 'Library'" class="border-bottom p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Library</span>
                </div>
                <div @click="toggleCallout('Library')" v-else class="p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Library</span>
                </div>
                <div @click="toggleCallout('Saved')" v-if="calloutView == 'Saved'" class="border-bottom p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Saved</span>
                </div>
                <div @click="toggleCallout('Saved')" v-else class="p-2 hoverable tpw--subtitle spectral-medium">
                    <span>Saved</span>
                </div>
            </div>
            <div class ="sort-select">
                <select v-model="sort" class="underline" >
                    <option value="updated" selected>Most Recent</option>
                    <option value="overall_score">Overall</option>
                    <option value="creativity_score">Creativity</option>
                    <option value="coherency_score">Coherency</option>
                    <option value="grammar_score">Grammar</option>
                    <option value="novelty_score">Novelty</option>
                    <option value="structure_score">Structure</option>
                </select>
            </div>
        </div>
        <div class="row mb-2" v-if="calloutView === 'Library'">
            <PublishedStoryContainer :sort=sort :key="sort"/>
        </div>
        <div class="row mb-2" v-if="calloutView === 'Saved'">
            <SavedContainer :sort=sort :key="sort"/>
        </div>
    </div>
</template>