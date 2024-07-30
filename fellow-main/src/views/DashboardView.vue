<script setup>
    import { ref } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, orderBy } from 'firebase/firestore';
    import { query } from 'firebase/firestore';
    import PublishedThumbnail from '../components/PublishedThumbnail.vue'
    
    const publishedRow = ref(Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1));
    const stories = useCollection(query(collection(db, "published"), orderBy("updated", "desc")));
    window.addEventListener('resize', () => {
        publishedRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });

    window.addEventListener('resize', () => {
        publishedRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });

</script>

<template>
    <div v-if="stories.length > 0" class="story-container">
        <div v-for="n in Math.ceil(stories.length/publishedRow)" :key="n">
            <div v-if="n == 1" class="row space-x-4"> 
                <div v-for="story in stories.slice(n-1, publishedRow)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="story" :key="story.id">
                    <PublishedThumbnail :notebook="story" :zIndex=1 />
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