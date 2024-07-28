<script setup>
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'
    import { ref } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, orderBy } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { query } from 'firebase/firestore';
    
    const numNotebooksRow = ref(Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1));
    const currUid = getAuth().currentUser.uid;
    const notebooks = useCollection(query(collection(db, "users", currUid, "notebooks" ), orderBy("timestamp", "desc")));
    window.addEventListener('resize', () => {
        numNotebooksRow.value = Math.max(Math.floor((window.innerWidth-256)/(15*16)), 1);
    });
</script>

<template>
    <div class="row space-x-2">
            <AddNewNotebook class="mr-6"/>
            <div v-if="notebooks.length > 0">
                <div v-for="n in Math.ceil(notebooks.length/numNotebooksRow)" :key="n">
                    <div v-if="n == 1" class="row space-x-4"> 
                        <NotebookThumbnail :edittable=true v-for="notebook in notebooks.slice(n-1, numNotebooksRow)" :zIndex="notebooks.length-notebooks.indexOf(notebook)+2" :notebook="notebook" :key="notebook.id"/>
                    </div>
                    <div v-else class="row mt-1 space-x-4">
                        <NotebookThumbnail :edittable=true v-for="notebook in notebooks.slice(numNotebooksRow*(n-1), notebooks.length-(numNotebooksRow*(n-1)) > 0 ? numNotebooksRow*(n-1)+numNotebooksRow : notebooks.length)" :zIndex="notebooks.length-notebooks.indexOf(notebook)+2" :notebook="notebook" :key="notebook.id"/>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col content-center items-center p-2 text-gray-500" style="font-size: 20pt; font-weight: 250; width: 20rem; height: 100%;">
                <h3>Start your Fellow-powered writing journey by creating your first Notebook!</h3>
            </div>
    </div>
</template>