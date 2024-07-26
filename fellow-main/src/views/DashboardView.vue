<script setup>
    import TitleWidget from '../components/TitleWidget.vue'
    import { getAuth,onAuthStateChanged } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { onBeforeUnmount } from 'vue'

    /*const router = useRouter()
    const authListener = onAuthStateChanged(getAuth(),function(user) {
        if (!user) { // not logged in
            alert('you must be logged in to view this. redirecting to the home page')
            router.push('/')
        }
    });

    onBeforeUnmount(() => {
        // clear up listener
        authListener()
    })*/
</script>

<template>
    <TitleWidget title="Library" />
</template>