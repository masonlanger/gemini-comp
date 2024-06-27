<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import { db } from '@/firebaseConfig';
    import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    
    const currUid = getAuth().currentUser.uid;

    const docRef = doc(db, 'users', currUid)
    const user = await getDoc(docRef).then(docSnap => docSnap.data())

    const retrieveNotebooks = query(collection(db, `users/${currUid}/notebooks`));
    const notebooks = await getDocs(retrieveNotebooks).then(
        querySnapshot => querySnapshot.docs.map(doc => {
            console.log(doc.data());
            return doc.data();
        })
    );
</script>

<template>
    <div class="row">
            <AddNewNotebook />
            <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" />
    </div>
</template>