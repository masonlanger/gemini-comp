<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    
    const currUid = getAuth().currentUser.uid;
    const notebooks = useCollection(collection(db, "users", currUid, "notebooks" ));

</script>

<template>
    <div class="row">
            <AddNewNotebook />
            <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" />
    </div>
</template>