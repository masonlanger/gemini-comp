<script setup>
import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'
    
const currUid = getAuth().currentUser.uid;


function postNewNotebook() {
    const doc = addDoc(collection(db, "users", currUid, "notebooks"), {
        name: "Untitled",
        text: "",
        timestamp: serverTimestamp(),
        published: 0,
        genres: "undefined",
        subgenres: "undefined",
        level: "",
        scores: {
            overall: {
                score: 0,
                summary: "",
            },
            creativity: {
                score: 0,
                summary: "",
            },
            grammar: {
                score: 0,
                summary: "",
            },
            coherency: {
                score: 0,
                summary: "",
            },
            novelty: {
                score: 0,
                summary: "",
            },
            structure: {
                score: 0,
                summary: "",
            },
        },
    });

    const router = useRouter();
    router.push('/');
}
</script>


<template>
    <div class="ann-block" @click=postNewNotebook>
        <font-awesome-icon class="fa-2x" :icon="['fas', 'pencil']" />
        <h1>Add New Notebook</h1>
    </div>
</template>