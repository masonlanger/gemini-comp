<script setup>
    import { ref, defineProps, watch } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, query, orderBy, where } from 'firebase/firestore';
    import PublishedThumbnail from '../components/PublishedThumbnail.vue'
    import SubtitleIconWidget from './SubtitleIconWidget.vue';
    const props = defineProps({
        sort: {
            required: true,
            default: "updated"
        },
        user: {
            type: String,
            required: false
        },
        showHeader: {
            type: Boolean,
            required: false,
            default: true
        }
    })


    const sort = ref(props.sort)
    watch(() => props.sort, (newVal) => {
        sort.value = newVal;
    });
    watch(() => props.user, (newVal) => {
        user.value = newVal;
        if(user.value){
        q = query(collection(db, "published"), where('author', '==', user.value), orderBy("updated", "desc"));
        } else {
            q = query(collection(db, "published"), orderBy(sort.value, "desc"));
        }
        stories = useCollection(q);
    });

    const user = ref(props.user)
    const publishedRow = ref(Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1));
    let stories = null;
    // let q = query(collection(db, "published"), where('author', '==', props.user));
    // stories = useCollection(q);
    let q = null
    if(user.value){
        q = query(collection(db, "published"), where('author', '==', user.value), orderBy("updated", "desc"));
    } else {
        q = query(collection(db, "published"), orderBy(sort.value, "desc"));
    }
    stories = useCollection(q);
    window.addEventListener('resize', () => {
        publishedRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });
</script>

<template>
    <div>
        <div v-if="user">
                <div v-if="showHeader && stories.length > 0">
                    <SubtitleIconWidget subtitle="Published Notebooks" icon="book" />
                </div>
                <div v-if="stories.length > 0" class="py-4 px-8" :key="refresh">
                        <div class="row space-x-8"> 
                            <div v-for="story in stories.slice(n-1, publishedRow-1)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="story" :key="story.id">
                                <PublishedThumbnail :notebook="story" :zIndex=1 :score="sort" :hideScore="true" :showProfile="false"/>
                        </div>
                 </div>
            </div>
        </div>
        <div v-else>
                <div v-if="stories.length > 0" class="story-container" :key="refresh">
                <div v-for="n in Math.ceil(stories.length/publishedRow)" :key="n">
                    <div v-if="n == 1" class="row space-x-4"> 
                        <div v-for="story in stories.slice(n-1, publishedRow)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="story" :key="story.id">
                            <PublishedThumbnail :notebook="story" :zIndex=1 :score="sort" />
                        </div>
                    </div>
                    <div v-else class="row mt-1 space-x-4">
                        <div v-for="story in stories.slice(publishedRow*(n-1), stories.length-(publishedRow*(n-1)) > 0 ? publishedRow*(n-1)+publishedRow : stories.length)" :zIndex="stories.length-stories.indexOf(story)+2" :notebook="story" :key="story.id">
                            <PublishedThumbnail :notebook="story" :zIndex=1 :score="sort"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>