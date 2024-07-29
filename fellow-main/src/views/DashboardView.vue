<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import { getAuth,onAuthStateChanged } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { onBeforeUnmount } from 'vue'
    import { ref } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, orderBy } from 'firebase/firestore';
    import { query } from 'firebase/firestore';
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    
    const publishedRow = ref(Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1));
    const currUid = getAuth().currentUser.uid;
    const stories = useCollection(query(collection(db, "published"), orderBy("updated", "desc")));
    window.addEventListener('resize', () => {
        publishedRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });
</script>

<template>
    <div v-if="stories.length > 0">
                <div v-for="n in Math.ceil(stories.length/publishedRow)" :key="n">
                    <div v-if="n == 1" class="row space-x-4"> 
                        <NotebookThumbnail :edittable=true v-for="story in stories.slice(n-1, publishedRow)" :zIndex="stories.length-stories.indexOf(story)+2" :story="story" :key="story.id"/>
                    </div>
                    <div v-else class="row mt-1 space-x-4">
                        <NotebookThumbnail :edittable=true v-for="story in stories.slice(publishedRow*(n-1), stories.length-(publishedRow*(n-1)) > 0 ? publishedRow*(n-1)+publishedRow : stories.length)" :zIndex="stories.length-stories.indexOf(story)+2" :story="story" :key="story.id"/>
                    </div>
                </div>
            </div>
</template>