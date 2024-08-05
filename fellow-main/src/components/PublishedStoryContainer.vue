<script setup>
    import { ref, defineProps } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, query, orderBy, where } from 'firebase/firestore';
    import PublishedThumbnail from '../components/PublishedThumbnail.vue'
    const props = defineProps({
        sort: {
            required: true,
            default: "updated"
        },
        user: {
            type: String,
            required: false
        }
    })
    const sort = ref(props.sort)
    const publishedRow = ref(Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1));
    const stories = ref(null);
    if(props.user){
        const q = query(collection(db, "published"), where('author', '==', props.user));
         stories.value = useCollection(q);
    } else {
        stories.value = useCollection(query(collection(db, "published"), orderBy(sort.value, "desc")));
    }
    console.log(props.user);
    console.log(stories);
    window.addEventListener('resize', () => {
        publishedRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });
</script>

<template>
    <div>
        <div v-if="!user">
            <div v-for="n in Math.ceil(stories.length/publishedRow)" :key="n">
                <div v-if="n == 1" class="row space-x-6"> 
                    <div v-for="story in stories.slice(n-1, publishedRow)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="story" :key="story.id">
                        <PublishedThumbnail :notebook="story" :zIndex=1 :score="sort" />
                    </div>
                </div>
                <div v-else class="row mt-4 space-x-4">
                    <div v-for="story in stories.slice(publishedRow*(n-1), stories.length-(publishedRow*(n-1)) > 0 ? publishedRow*(n-1)+publishedRow : stories.length)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="notebook" :key="story.id">
                        <PublishedThumbnail :notebook="story" :zIndex=1 :score="sort"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="stories.length > 0" class="story-container" :key="refresh">
                <div v-for="n in Math.ceil(stories.length/publishedRow)" :key="n">
                    <div v-if="n == 1" class="row space-x-4"> 
                        <div v-for="story in stories.slice(n-1, publishedRow)" :notebook="story" :key="story.id">
                            <PublishedThumbnail :notebook="story" :showProfile=false />
                        </div>
                    </div>
                    <div v-else class="row mt-2 space-x-4">
                        <div v-for="story in stories.slice(publishedRow*(n-1), stories.length-(publishedRow*(n-1)) > 0 ? publishedRow*(n-1)+publishedRow : stories.length)" :notebook="story" :key="story.id">
                            <PublishedThumbnail :notebook="story" :showProfile=false />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>