<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import { db } from '@/firebaseConfig';
    import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';
    const props = defineProps({
        userID: {
            type: String,
            required: true
        }
    })

    const docRef = doc(db, 'users', props.userID)
    const user = await getDoc(docRef).then(docSnap => docSnap.data())

    const retrieveNotebooks = query(collection(db, `users/${props.userID}/Notebooks`));
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