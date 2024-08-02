<script setup>
import { ref, defineProps } from 'vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { searchPublicUser } from '@/publicUserSearch';
import { useRouter } from 'vue-router';
const props = defineProps({
    notebook: {
        type: Object,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    zIndex: {
        type: Number,
        default: 1,
        required: true
    
    }
})
const router = useRouter();
const img = ref(null);

async function getClickedAuthor(author){
    return await searchPublicUser(author);
}

getClickedAuthor(props.notebook.author).then((users) => {
    users.forEach((user) => {
        const imageRef = storageRef(storage, `users/${user.id}/profile.jpg`);
        getDownloadURL(imageRef).then((url) => {
            img.value = url;
            return url;
        });
        return user.data();
    });
});

let preview =  props.notebook.preview
if(preview.length > 500){
    preview = preview.substring(0,540)
}


function onProfileClick(){
    getClickedAuthor(props.notebook.author).then((users) => {
        users.forEach((user) => { console.log(user.data()); return user.data()});
    });
    router.push('/writers/'+props.notebook.author);
}

function onThumbnailClick() {
    window.open('http://localhost:3030/?p=' + props.notebook.id, "_blank");
}

</script>





<template>
    <div class="notebook-thumbnail rounded-lg items-center" :style="{ 'z-index': zIndex }">
        <div class="row justify-between">
            <h3 class="last-updated text-xs">{{ notebook.updated.toDate().toString().substring(0,15) }}</h3>
            <h3 v-if="score == 'updated'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.overall_score }}/100</h3>
            <h3 v-if="score == 'overall_score'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.overall_score }}/100</h3>
            <h3 v-if="score == 'creativity_score'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.creativity_score }}/20</h3>
            <h3 v-if="score == 'grammar_score'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.grammar_score }}/20</h3>
            <h3 v-if="score == 'coherency_score'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.coherency_score }}/20</h3>
            <h3 v-if="score == 'structure_score'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.structure_score }}/20</h3>
            <h3 v-if="score == 'novelty_score'" class="bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ notebook.novelty_score }}/20</h3>
        </div>
        <div class="notebook-thumbnail--flex mt-2" @click="onThumbnailClick">
            <div class="items-center justify-center text-gray-700">
                <div class="story-preview">{{ preview }}</div>
                <h2 class="notebook-thumbnail--title">{{ notebook.title }}</h2>
                <h3 class="text-gray-400 text-center text-sm">{{ notebook.subgenres }}</h3>
            </div>
        </div>
        <div v-if="notebook.author != 'anonymous'" class="row pt-2 space-x-1 justify-center items-center" @click="onProfileClick">
            <img v-if="img" :src="img" :style="{width: '2.5rem', aspectRatio: '1/1'}" class="rounded-full"/>
            <div v-else class="flex justify-center rounded-full bg-gray-200" :style="{width: '2.5rem', aspectRatio: '1/1'}">
                <font-awesome-icon :icon="['fas', 'user']" class="fa-1x text-gray-500" />
            </div>
            <h3 class="text-gray-700 text-center text-sm">{{ notebook.author }}</h3>
        </div>
        <div v-else class="row pt-2 space-x-1 justify-center items-center">
            <div class="flex justify-center items-center rounded-full bg-gray-200" :style="{width: '2.5rem', aspectRatio: '1/1'}">
                <font-awesome-icon :icon="['fas', 'user']" class="fa-1x text-gray-500" />
            </div>
            <h3 class="text-gray-700 text-center text-sm">{{ notebook.author }}</h3>
        </div>
    </div>
</template>