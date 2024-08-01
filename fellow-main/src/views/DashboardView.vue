<script setup>
    import { ref } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, orderBy } from 'firebase/firestore';
    import { query } from 'firebase/firestore';
    import PublishedThumbnail from '../components/PublishedThumbnail.vue'
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
            <option value="structure_score">Sructure</option>
        </select>
    </div>
    <div v-if="stories.length > 0" class="story-container" :key="refresh">
        <div v-for="n in Math.ceil(stories.length/publishedRow)" :key="n">
            <div v-if="n == 1" class="row space-x-4"> 
                <div v-for="story in stories.slice(n-1, publishedRow)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="story" :key="story.id">
                    <PublishedThumbnail :notebook="story" :zIndex=1 :score="sort" />
                </div>
            </div>
            <div v-else class="row mt-1 space-x-4">
                <div v-for="story in stories.slice(publishedRow*(n-1), stories.length-(publishedRow*(n-1)) > 0 ? publishedRow*(n-1)+publishedRow : stories.length)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="notebook" :key="story.id">
                    <PublishedThumbnail :notebook="story" :zIndex=1 />
                </div>
            </div>
        </div>
    </div>
</template>