<script setup>
    import { ref } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, orderBy } from 'firebase/firestore';
    import { query } from 'firebase/firestore';
    import PublishedStoryContainer from '@/components/PublishedStoryContainer.vue';
    const sort = ref("updated")
    const refresh = ref(0)
    const publishedRow = ref(Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1));
    let stories = useCollection(query(collection(db, "published"), orderBy(sort.value, "desc")));
    window.addEventListener('resize', () => {
        publishedRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });

    function sortSelect(){
        stories = useCollection(query(collection(db, "published"), orderBy(sort.value, "desc")));
        refresh.value += 1;
    }
</script>

<template>
    <div class ="sort-select">
        <select v-model="sort" @change="sortSelect()">
            <option value="updated" selected>Most Recent</option>
            <option value="overall_score">Overall</option>
            <option value="creativity_score">Creativity</option>
            <option value="coherency_score">Coherency</option>
            <option value="grammar_score">Grammar</option>
            <option value="novelty_score">Novelty</option>
            <option value="structure_score">Structure</option>
        </select>
    </div>
    <PublishedStoryContainer :sort=sort />
</template>