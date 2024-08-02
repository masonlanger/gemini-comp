<script setup>
import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'
    
const currUid = getAuth().currentUser.uid;


function postNewNotebook() {
    addDoc(collection(db, "users", currUid, "notebooks"), {
        name: "Untitled",
        text: "",
        timestamp: serverTimestamp(),
        published: false,
        publishedID: null,
        genres: "undefined",
        subgenres: "undefined",
        preview: ""
    });

    const router = useRouter();
    router.push('/');
}
</script>


<template>
    <div class="ann-block" @click=postNewNotebook>
        <font-awesome-icon class="fa-1x" :icon="['fas', 'plus']" />
        <h2 class="font-bold">New</h2>
    </div>
</template>