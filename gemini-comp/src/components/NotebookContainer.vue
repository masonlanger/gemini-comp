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
            <div v-if="notebooks.length > 0">
                <NotebookThumbnail :edittable=true v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id"/>
            </div>
            <div v-else class="flex flex-col content-center items-center p-2 text-gray-500" style="font-size: 20pt; font-weight: 250; width: 20rem; height: 100%;">
                <h3>Start your Fellow-powered writing journey by creating your first Notebook!</h3>
            </div>
    </div>
</template>