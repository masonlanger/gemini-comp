<script setup>
import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue';

const emit = defineEmits(['click']);
    
const currUid = getAuth().currentUser.uid;

function postNewInspo() {
    const doc = addDoc(collection(db, "users", currUid, "inspos"), {
        title: "Untitled",
        text: "",
        author: "Unknown",
        timestamp: serverTimestamp(),
        published: 0,
        genres: "undefined",
        subgenres: "undefined"
    });
    
    const router = useRouter();
    router.push('/');
}
</script>


<template>
    <div class="ann-block" @click=postNewInspo>
        <font-awesome-icon class="fa-2x" :icon="['fas', 'lightbulb']" />
        <h1>Add a new Inspiration</h1>
    </div>
</template>