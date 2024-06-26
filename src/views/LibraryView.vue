<script setup>
    defineProps({
    userID: {
        type: Object,
        required: true
    },
    })

    import TitleWidget from '../components/TitleWidget.vue'
    import NotebookContainer from '../components/NotebookContainer.vue'
    import { getAuth,onAuthStateChanged } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { onBeforeUnmount } from 'vue'

    const router = useRouter()
    const authListener = onAuthStateChanged(getAuth(),function(user) {
        if (!user) { // not logged in
            alert('you must be logged in to view this. redirecting to the home page')
            router.push('/')
        }
    });

    onBeforeUnmount(() => {
        // clear up listener
        authListener()
    })
</script>

<template>
    <TitleWidget title="Library" />
    <div class="row">
            <!-- <NotebookThumbnail v-for="notebook in notebooks" :notebook="notebook" :key="notebook.id" /> -->
            <Suspense>
                <NotebookContainer userID="xR1hwZsxzs75nIzLSlEj"/>
                <template #fallback>
                    <!--Code for skeleton rendering goes here-->
                    <!-- Dummy notebook thumbnail -->
                    Loading...
                </template>
            </Suspense>
    </div>
</template>