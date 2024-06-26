<script setup>
    import { usersRef } from '@/main'
    import { useCollection } from 'vuefire'
    import TitleWidget from '../components/TitleWidget.vue'
    import AddNewNotebook from '../components/AddNewNotebook.vue'
    import NotebookThumbnail from '../components/NotebookThumbnail.vue'

    // const props = defineProps({
    //     userID: {
    //         type: String,
    //         required: true
    //     },
    // })

    const props = {
        userID: 'xR1hwZsxzs75nIzLSlEj'
    }

    // const docs = useCollection(
    //     query(
    //         usersRef,
    //         where(firebase.firestore.FieldPath.documentId(), '==', props.userID)
    //     )
    // );
    const docs = useCollection(usersRef);
    console.log(docs);
</script>

<template>
    <TitleWidget title="Library" />
    <div class="row">
        <AddNewNotebook />
        <!-- <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" /> -->
        <h1 v-for="doc in docs" :key="doc.id">{{ doc.Name }}</h1>
    </div>
    
</template>