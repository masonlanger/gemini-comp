<script setup>
    import TitleWidget from '@/components/TitleWidget.vue';
    import { db } from '@/firebaseConfig';
    import { useRouter, useRoute } from 'vue-router'
    import { ref } from 'vue'
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import EditorView from '@/views/EditorView.vue';
    import { doc, getDoc } from 'firebase/firestore';
    const router = useRouter();

    const authListener = onAuthStateChanged(getAuth(),function(user) {
        if (!user) { // not logged in
            alert('you must be logged in to view this. redirecting to the home page')
            router.push('/')
        }
    });

    const notebookData = ref(null);
        const currUid = getAuth().currentUser.uid;
        const route = useRoute();
        console.log("Params: " + route.params.id);
        console.log("Path: users/" + currUid + "/notebooks/" + route.params.id);
        const docRef = doc(db, "users", currUid, "notebooks", route.params.id);
        console.log(docRef)
        notebookData.value = await getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
</script>

<template>
    <TitleWidget editable :title=notebookData.name :uid=currUid />
    <EditorView />
</template>