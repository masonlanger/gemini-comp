<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, query, where, getDocs } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    
    const currUid = getAuth().currentUser.uid;
    const notebooks = collection(db, "users", currUid, "notebooks" );
    const q = query(notebooks, where("published", "==", 2));
    const featuredNotebooks = await getDocs(q).then((querySnapshot) => {
        let featuredNotebooks = [];
        querySnapshot.forEach((doc) => {
            featuredNotebooks.push(doc.data());
        });
        return featuredNotebooks;
    });
</script>

<template>
    <div class="row">
            <NotebookThumbnail v-for="notebook in featuredNotebooks" :notebook="notebook" :key="notebook.id"/>
    </div>
</template>