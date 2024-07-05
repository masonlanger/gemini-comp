<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import NotebookContainer from '../components/NotebookContainer.vue'
    import { ref } from 'vue';
    import { getAuth,onAuthStateChanged } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { onBeforeUnmount } from 'vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection } from 'firebase/firestore';

    const working = ref(false)

    const currUid = getAuth().currentUser.uid;
    const notebooks = useCollection(collection(db, "users", currUid, "notebooks" ));
</script>

<template>
    <div class="home">
        <TitleWidget title="Library" />
        <div class="row">
            <!-- <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" /> -->
            <Suspense>
                <NotebookContainer />
                <template #fallback>
                    <!--Code for skeleton rendering goes here-->
                    <!-- Dummy notebook thumbnail -->
                    Loading...
                </template>
            </Suspense>
        </div>
    </div>
</template>