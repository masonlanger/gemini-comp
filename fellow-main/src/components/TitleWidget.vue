<script setup>
import { ref } from 'vue'
import { db } from '@/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    paragraph: {
        type: String,
        required: false
    },
    uid: {
        type: String,
        required: false
    },
    notebookId: {
        type: String,
        required: false
    },
    editable: {
        fast: Boolean
    }
})

const notebookTitle = ref(props.title);

const submitTitle = () => {
    const docRef = doc(db, "users", props.uid, "notebooks", props.notebookId);
    updateDoc(docRef, {
        name: notebookTitle.value
    });
}
</script>

<template>
    <div v-if=props.editable class="tpw">
        <div class="flex flex-row items-center space-x-4">
            <form @submit.prevent="submitTitle"><input type="text" :value='notebookTitle' @input="notebookTitle = $event.target.value" class="title" /></form>
        </div>
        <h3 v-if="subtitle" class="tpw--subtitle">{{ subtitle }}</h3>
        <p v-if="paragraph" class="tpw--paragraph">{{ paragraph }}</p>
    </div>
    <div v-else class="tpw">
        <h2 class="title spectral-bold">{{ title }}</h2>
        <h3 v-if="subtitle" class="tpw--subtitle">{{ subtitle }}</h3>
        <p v-if="paragraph" class="tpw--paragraph">{{ paragraph }}</p>
    </div>
</template>