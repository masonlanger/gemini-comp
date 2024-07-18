<script setup>
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    
    const currUid = getAuth().currentUser.uid;
    const notebooks = useCollection(collection(db, "users", currUid, "notebooks" ));
    // const notebookRows = Math.ceil(notebooks.length/5);
    // console.log(notebookRows)
</script>

<template>
    <div class="row space-x-2">
            <AddNewNotebook />
            <div v-if="notebooks.length > 0">
                <div v-for="n in Math.ceil(notebooks.length/5)" :key="n">
                    <div v-if="n == 1" class="row space-x-2"> 
                        <NotebookThumbnail :edittable=true v-for="notebook in notebooks.slice(n-1, 5)" :notebook="notebook" :key="notebook.id"/>
                    </div>
                    <div v-else class="row mt-1 space-x-2">
                        <NotebookThumbnail :edittable=true v-for="notebook in notebooks.slice(5*(n-1), notebooks.length-(5*(n-1)) > 0 ? 5*(n-1)+5 : notebooks.length)" :notebook="notebook" :key="notebook.id"/>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col content-center items-center p-2 text-gray-500" style="font-size: 20pt; font-weight: 250; width: 20rem; height: 100%;">
                <h3>Start your Fellow-powered writing journey by creating your first Notebook!</h3>
            </div>
    </div>
</template>